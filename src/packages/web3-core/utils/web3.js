import { AddressZero } from '@ethersproject/constants';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { getNodeUrl } from './rpc-url.js';
import { POLLING_INTERVAL } from '../config/constants.js';
// Fallback Provider
const getProvider = (networkId) => {
    const rpcUrl = getNodeUrl(networkId);
    if (!rpcUrl) {
        console.log('RPC URL not found.');
    }
    const library = new JsonRpcProvider(rpcUrl);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
};
// Used if wallet is connected
export const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
};
const getSigner = (library, account) => {
    return library.getSigner(account).connectUnchecked();
};
export const getProviderOrSigner = (_library, account, networkId) => {
    if (!networkId) {
        throw new Error('Invalid network');
    }
    let library = _library;
    if (!library) {
        library = getProvider(networkId);
    }
    if (!account) {
        throw new Error('Invalid account');
    }
    return getSigner(library, account);
};
export const getReadOnlyProvider = (networkId) => {
    if (!networkId) {
        return;
    }
    return getProviderOrSigner(undefined, AddressZero, networkId);
};
