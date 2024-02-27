import { useCallback, useEffect, useState } from 'react';
import { ConnectorNames } from '../enum.js';
import { useActivator } from './useActivator.jsx';
import { walletTrackerLS } from '../utils/local-storage.js';
import { delay } from '../utils/delay.js';
/**
 * Should only be called after confirming that
 * `window.BinanceChain` does not exist
 */
const _binanceChainListener = async () => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(Error('No binance provider found'));
        }, 5000);
        Object.defineProperty(window, 'BinanceChain', {
            get() {
                return this.bsc;
            },
            set(bsc) {
                this.bsc = bsc;
                resolve(null);
            }
        });
    });
};
// This hook tries to connect to last used wallet on mount
// Makes sure that this hook is called only once
export const useEagerConnect = (networkId) => {
    const [tried, setTried] = useState(false);
    const login = useActivator();
    const autoConnect = useCallback(async (connectorName) => {
        if (!networkId) {
            return;
        }
        // TODO: Improve logic so that we don't need to check for each connector
        // and instead just check one based on `connectorName`
        if (connectorName === ConnectorNames.MetaMask) {
            try {
                // @ts-expect-error
                const isUnlocked = await window.ethereum._metamask.isUnlocked();
                if (!isUnlocked) {
                    return;
                }
            }
            catch (error) { /* swallow */ }
        }
        if (connectorName === ConnectorNames.OKXWallet) {
            try {
                const isUnlocked = await window.okxwallet.isUnlock();
                if (!isUnlocked) {
                    return;
                }
            }
            catch (error) { /* swallow */ }
        }
        setTried(true);
        if (connectorName === ConnectorNames.BinanceWallet) {
            const isBinanceChainDefined = Reflect.has(window, 'BinanceChain');
            if (!isBinanceChainDefined) {
                // window.BinanceChain might not be immediately available on page load
                // Therefore, wait for window.BinanceChain to be available
                _binanceChainListener()
                    .then(async () => { await login(networkId, connectorName); })
                    .catch(() => { console.log('Could not auto connect', connectorName); });
                return;
            }
        }
        // delay to avoid stale error issue
        // https://github.com/Uniswap/web3-react/issues/78
        await delay(500);
        login(networkId, connectorName)
            .catch(() => { console.log('Could not auto connect', connectorName); });
    }, [login, networkId]);
    useEffect(() => {
        if (tried) {
            return;
        }
        const connectorName = walletTrackerLS.getConnector();
        if (!connectorName) {
            setTried(true);
            return;
        }
        // @ts-expect-error
        autoConnect(connectorName).catch(console.error);
    }, [autoConnect, tried]);
};
