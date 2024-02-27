import { type ConnectorNames } from '../enum.js';
export declare function useActivator({ onDeactivate, onActivate }?: {
    onDeactivate?: () => void;
    onActivate?: (connectorName: ConnectorNames, networkId: number) => void;
}): (networkId: number, connectorName: ConnectorNames) => Promise<void>;
