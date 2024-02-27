/* eslint-disable no-prototype-builtins */
// Forked from: https://github.com/Uniswap/web3-react/blob/v6/packages/injected-connector/src/index.ts
import { warning } from '../../vendor/tiny-warning.js';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { getProvider } from './provider.js';
import { commonSetupNetwork } from '../$common/setup-network.js';
import { CustomException } from '../../utils/CustomException.js';
import { __DEV__ } from '../$common/env.js';
import { ConnectorNames } from '../../enum.js';
import { parseSendReturn } from '../$common/parse-send-return.js';
class NoEthereumProviderError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'No Ethereum provider was found on provider.';
    }
}
class UserRejectedRequestError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'The user rejected the request.';
    }
}
export class OkxConnector extends AbstractConnector {
    NAME = 'OKX Wallet';
    CONNECTOR_NAME = ConnectorNames.OKXWallet;
    constructor(kwargs) {
        super(kwargs);
        this.handleNetworkChanged = this.handleNetworkChanged.bind(this);
        this.handleChainChanged = this.handleChainChanged.bind(this);
        this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    handleChainChanged(chainId) {
        if (__DEV__) {
            console.log("Handling 'chainChanged' event with payload", chainId);
        }
        this.emitUpdate({ chainId, provider: getProvider() });
    }
    handleAccountsChanged(accounts) {
        if (__DEV__) {
            console.log("Handling 'accountsChanged' event with payload", accounts);
        }
        if (accounts.length === 0) {
            this.emitDeactivate();
        }
        else {
            this.emitUpdate({ account: accounts[0] });
        }
    }
    handleClose(code, reason) {
        if (__DEV__) {
            console.log("Handling 'close' event with payload", code, reason);
        }
        this.emitDeactivate();
    }
    handleNetworkChanged(chainId) {
        if (__DEV__) {
            console.log("Handling 'networkChanged' event with payload", chainId);
        }
        this.emitUpdate({ chainId, provider: getProvider() });
    }
    async activate() {
        const provider = getProvider();
        if (!provider) {
            throw new NoEthereumProviderError();
        }
        if (provider.on) {
            provider.on('chainChanged', this.handleChainChanged);
            provider.on('accountsChanged', this.handleAccountsChanged);
            provider.on('close', this.handleClose);
            provider.on('networkChanged', this.handleNetworkChanged);
        }
        if (provider.isMetaMask) {
            provider.autoRefreshOnNetworkChange = false;
        }
        // try to activate + get account via eth_requestAccounts
        let account;
        try {
            account = await provider
                .send('eth_requestAccounts')
                .then((sendReturn) => parseSendReturn(sendReturn)[0]);
        }
        catch (error) {
            if (error.code === 4001) {
                throw new UserRejectedRequestError();
            }
            warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable');
        }
        // if unsuccessful, try enable
        if (!account) {
            // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
            account = await provider
                .enable()
                .then((sendReturn) => sendReturn && parseSendReturn(sendReturn)[0]);
        }
        return Object.assign({ provider }, account ? { account } : {});
    }
    async getProvider() {
        return getProvider();
    }
    async getChainId() {
        const provider = getProvider();
        if (!provider) {
            throw new NoEthereumProviderError();
        }
        let chainId;
        try {
            chainId = await provider.send('eth_chainId').then(parseSendReturn);
        }
        catch (_a) {
            warning(false, 'eth_chainId was unsuccessful, falling back to net_version');
        }
        if (!chainId) {
            try {
                chainId = await provider.send('net_version').then(parseSendReturn);
            }
            catch (_b) {
                warning(false, 'net_version was unsuccessful, falling back to net version v2');
            }
        }
        if (!chainId) {
            try {
                chainId = parseSendReturn(provider.send({ method: 'net_version' }));
            }
            catch (_c) {
                warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties');
            }
        }
        if (!chainId) {
            if (provider.isDapper) {
                chainId = parseSendReturn(provider.cachedResults.net_version);
            }
            else {
                chainId =
                    provider.chainId ||
                        provider.netVersion ||
                        provider.networkVersion ||
                        provider._chainId;
            }
        }
        return chainId;
    }
    async getAccount() {
        const provider = getProvider();
        if (!provider) {
            throw new NoEthereumProviderError();
        }
        let account;
        try {
            account = await provider
                .send('eth_accounts')
                .then((sendReturn) => parseSendReturn(sendReturn)[0]);
        }
        catch (_a) {
            warning(false, 'eth_accounts was unsuccessful, falling back to enable');
        }
        if (!account) {
            try {
                account = await provider
                    .enable()
                    .then((sendReturn) => parseSendReturn(sendReturn)[0]);
            }
            catch (_b) {
                warning(false, 'enable was unsuccessful, falling back to eth_accounts v2');
            }
        }
        if (!account) {
            account = parseSendReturn(provider.send({ method: 'eth_accounts' }))[0];
        }
        return account;
    }
    deactivate() {
        const provider = getProvider();
        if (provider?.removeListener) {
            provider.removeListener('chainChanged', this.handleChainChanged);
            provider.removeListener('accountsChanged', this.handleAccountsChanged);
            provider.removeListener('close', this.handleClose);
            provider.removeListener('networkChanged', this.handleNetworkChanged);
        }
    }
    async isAuthorized() {
        const provider = getProvider();
        if (!provider) {
            return false;
        }
        try {
            return await provider.send('eth_accounts').then((sendReturn) => {
                if (parseSendReturn(sendReturn).length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        catch (_a) {
            return false;
        }
    }
    async setupNetwork(networkId) {
        return await commonSetupNetwork(getProvider(), networkId);
    }
    handleError(error) {
        if (error instanceof NoEthereumProviderError) {
            throw CustomException({
                type: 'error',
                title: 'Provider Error',
                message: 'Could not connect. No provider found',
                error
            });
        }
        if (error instanceof UserRejectedRequestError) {
            throw CustomException({
                type: 'error',
                title: 'Authorization Error',
                message: `${this.NAME}: Please authorize to access your account`,
                error
            });
        }
        throw CustomException({
            type: 'error',
            title: 'Error',
            message: `${this.NAME}: ${error.message || 'Something went wrong'}`,
            error
        });
    }
}
