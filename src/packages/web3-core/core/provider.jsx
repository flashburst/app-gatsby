import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Manager } from './manager.js';
import { invariant } from '../vendor/tiny-invariant.js';
export const PRIMARY_KEY = 'primary';
const CONTEXTS = {};
export function createWeb3ReactRoot(key) {
    invariant(!CONTEXTS[key], `A root already exists for provided key ${key}`);
    CONTEXTS[key] = createContext({
        activate: async () => {
            invariant(false, 'No <Web3ReactProvider ... /> found.');
        },
        setError: () => {
            invariant(false, 'No <Web3ReactProvider ... /> found.');
        },
        deactivate: () => {
            invariant(false, 'No <Web3ReactProvider ... /> found.');
        },
        active: false
    });
    CONTEXTS[key].displayName = `Web3ReactContext - ${key}`;
    const Provider = CONTEXTS[key].Provider;
    return function Web3ReactProvider({ getLibrary, children }) {
        const [manager] = useState(() => new Manager());
        const [state, setState] = useState({});
        const { connector, provider, chainId, account, error } = state;
        useEffect(() => {
            const store = manager.getStore();
            const unsubscribe = store.subscribe(() => {
                setState(store.getState());
            });
            return () => { manager.handleUnmount(); unsubscribe(); };
        }, [manager]);
        const active = connector !== undefined &&
            chainId !== undefined &&
            account !== undefined &&
            !error;
        const library = useMemo(() => active &&
            chainId !== undefined &&
            Number.isInteger(chainId) &&
            !!connector
            ? getLibrary(provider, connector)
            : undefined, [active, getLibrary, provider, connector, chainId]);
        const web3ReactContext = {
            connector,
            library,
            chainId,
            account,
            activate: manager.activate,
            setError: manager.setError,
            deactivate: manager.deactivate,
            active,
            error
        };
        return <Provider value={web3ReactContext}>{children}</Provider>;
    };
}
export const Web3ReactProvider = createWeb3ReactRoot(PRIMARY_KEY);
export function getWeb3ReactContext(key = PRIMARY_KEY) {
    invariant(Object.keys(CONTEXTS).includes(key), `Invalid key ${key}`);
    return CONTEXTS[key];
}
export function useWeb3React(key) {
    return useContext(getWeb3ReactContext(key));
}
