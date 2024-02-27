import { ConnectorNames } from '../enum.js';
import { type BinanceWalletConnector } from './binance-wallet/package.js';
import { type BitKeepConnector } from './bitkeep-wallet/package.js';
import { type CoinbaseConnector } from './coinbase-wallet/package.js';
import { type SafeAppConnector } from './gnosis-safe/package.js';
import { type InjectedConnector } from './injected/package.js';
import { type MetamaskConnector } from './metamask/package.js';
import { type OkxConnector } from './okx-wallet/package.js';
/**
 * Asynchronously load the selected connector only
 */
export declare function getConnectorByName(name: ConnectorNames, chainId: number): Promise<BinanceWalletConnector | BitKeepConnector | CoinbaseConnector | InjectedConnector | MetamaskConnector | SafeAppConnector | OkxConnector | null>;
