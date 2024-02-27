import { flushSync } from 'react-dom';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { Web3ReactProvider, useWeb3React } from './core/index.js';
import { useActivator } from './hooks/useActivator.jsx';
import { useDeactivator } from './hooks/useDeactivator.jsx';
import { useEagerConnect } from './hooks/useEagerConnect.jsx';
import { getLibrary, getProviderOrSigner } from './utils/web3.js';
import { getWallets } from './wallets/wallets.js';
import { useInactiveListener } from './hooks/useInactiveListener.jsx';
import { walletTrackerLS } from './utils/local-storage.js';
const Context = createContext({
    isActive: false,
    logout: () => { },
    openPopup: () => { },
    login: async () => { },
    switchNetwork: async () => { },
    signerOrProvider: undefined,
    connectedChainId: undefined,
    selectedChainId: undefined,
    setSelectedChainId: () => { },
    account: undefined
});
const PopupContext = createContext({
    wallets: [],
    isOpen: false,
    setIsOpen: () => null,
    isConnecting: false
});
export function useConnectWallet() {
    const context = useContext(Context);
    if (!context) {
        console.error('Use useConnectWallet inside the ConnectWalletProvider');
    }
    return context;
}
export function useConnectWalletPopup() {
    const context = useContext(PopupContext);
    if (!context) {
        console.error('Use useConnectWalletPopup inside the PopupContextProvider');
    }
    return context;
}
const tracker = {
    onActivate: (connectorName, _networkId) => { walletTrackerLS.trackConnector(connectorName); },
    onDeactivate: walletTrackerLS.clear
};
function ConnectWalletProvider({ children, connectors, supportedNetworks, getInitialNetwork }) {
    const { active, chainId: connectedChainId, account, library, connector } = useWeb3React();
    const login = useActivator({
        onActivate: tracker.onActivate,
        onDeactivate: tracker.onDeactivate
    });
    const logout = useDeactivator({ onDeactivate: tracker.onDeactivate });
    const [selectedChainId, setSelectedChainId] = useState(undefined);
    useEagerConnect(selectedChainId);
    useInactiveListener(logout);
    useEffect(() => {
        // import('./wallets/metamask-firefox.js').then(x => x.setupMetamaskForFirefox());
    }, []);
    useEffect(() => {
        getInitialNetwork()
            .then((n) => {
            if (!n || !supportedNetworks.includes(n)) {
                return;
            }
            // Don't change if the state already has a value
            setSelectedChainId(prev => prev ?? n);
        }).catch(console.error);
        // This hook has to run only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (active && connectedChainId !== selectedChainId) {
            logout();
        }
    }, [active, connectedChainId, logout, selectedChainId]);
    const signerOrProvider = useMemo(() => {
        if (account && connectedChainId && connectedChainId === selectedChainId) {
            return getProviderOrSigner(library, account || AddressZero, selectedChainId);
        }
    }, [account, connectedChainId, library, selectedChainId]);
    // Popup start
    const [isOpen, setIsOpen] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const wallets = useMemo(() => getWallets(connectors), [connectors]);
    // Popup end
    const value = useMemo(() => {
        const rawLoginFn = async (networkId, connectorName) => {
            if (!networkId) {
                console.log('Please select a network'); // alert is not called when the document is sandboxed
                window.alert('Please select a network');
                return;
            }
            try {
                setIsOpen(true);
                setIsConnecting(true);
                await login(networkId, connectorName);
            }
            catch (error) {
                console.error(error.message);
                console.log(error.message); // alert is not called when the document is sandboxed
                alert(error.message);
            }
            finally {
                setIsOpen(false);
                setIsConnecting(false);
            }
        };
        return {
            isActive: active,
            connectedChainId,
            selectedChainId,
            setSelectedChainId,
            account,
            logout,
            login: async (connectorName) => { await rawLoginFn(selectedChainId, connectorName); },
            signerOrProvider,
            openPopup: function () {
                if (active) {
                    logout();
                }
                setIsOpen(true);
            },
            switchNetwork: async function (networkId) {
                if (!networkId || !connector || !account || !active) {
                    // Not connected to a wallet already, so don't call login()
                    setSelectedChainId(networkId);
                    return;
                }
                // capture the connectorName before flushSync()
                // @ts-expect-error
                const connectorName = connector.CONNECTOR_NAME;
                flushSync(() => {
                    logout();
                    setSelectedChainId(networkId);
                });
                // React has updated the DOM by now
                if (!connectorName) {
                    console.error('CONNECTOR_NAME property missing');
                    return;
                }
                await rawLoginFn(networkId, connectorName);
            }
        };
    }, [account, active, connectedChainId, login, logout, connector, selectedChainId, signerOrProvider]);
    const popupContextValue = useMemo(() => {
        return { wallets, isOpen, setIsOpen, isConnecting };
    }, [isConnecting, isOpen, wallets]);
    return (<Context.Provider value={value}>
      <PopupContext.Provider value={popupContextValue}>
        {children}
      </PopupContext.Provider>
    </Context.Provider>);
}
const ConnectWalletRoot = ({ children, connectors, getInitialNetwork, supportedNetworks }) => {
    return (<Web3ReactProvider getLibrary={getLibrary}>
      <ConnectWalletProvider connectors={connectors} supportedNetworks={supportedNetworks} getInitialNetwork={getInitialNetwork}>
        {children}
      </ConnectWalletProvider>
    </Web3ReactProvider>);
};
export const ConnectWallet = {
    Root: ConnectWalletRoot
};
