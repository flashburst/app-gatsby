import { type Config, ConnectorNames } from '../enum.js';
export declare const getWallets: (connectorNames: ConnectorNames[]) => Array<Config & {
    id: number;
}>;
