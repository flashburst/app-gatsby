import { ConnectorNames } from '../enum.js';
import { isNotNull } from '../utils/not-null.js';
import { config as binanceWallet } from './binance-wallet/config.js';
import { config as bitkeepWallet } from './bitkeep-wallet/config.js';
import { config as coinbaseWallet } from './coinbase-wallet/config.js';
import { config as gnosisWallet } from './gnosis-safe/config.js';
import { config as injectedWallet } from './injected/config.js';
import { config as metamaskWallet } from './metamask/config.js';
import { config as okxWallet } from './okx-wallet/config.js';
const ConfigMap = {
    [ConnectorNames.BinanceWallet]: binanceWallet,
    [ConnectorNames.BitKeepWallet]: bitkeepWallet,
    [ConnectorNames.CoinbaseWallet]: coinbaseWallet,
    [ConnectorNames.Gnosis]: gnosisWallet,
    [ConnectorNames.Injected]: injectedWallet,
    [ConnectorNames.MetaMask]: metamaskWallet,
    [ConnectorNames.OKXWallet]: okxWallet
};
export const getWallets = (connectorNames) => {
    const result = connectorNames.map((connectorName, id) => {
        const config = ConfigMap[connectorName];
        if (!config) {
            return undefined;
        }
        return { id, ...config };
    }).filter(isNotNull);
    if (typeof window === 'undefined') {
        return result;
    }
    return result.sort((a, b) => {
        const x = Boolean(a?.isInstalled());
        const y = Boolean(b?.isInstalled());
        // Sorts boolean values so that all true(s) comes before false(s)
        return x === y ? 0 : x ? -1 : 1;
    });
};
