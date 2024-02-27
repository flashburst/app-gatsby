import { type ConnectorUpdate } from '@web3-react/types';
import { type AbstractConnector } from '@web3-react/abstract-connector';
export declare class UnsupportedChainIdError extends Error {
    constructor(unsupportedChainId: number, supportedChainIds?: readonly number[]);
}
interface Web3ReactManagerState {
    connector?: AbstractConnector;
    provider?: any;
    chainId?: number;
    account?: null | string;
    onError?: (error: Error) => void;
    error?: Error;
}
declare enum ActionType {
    ACTIVATE_CONNECTOR = 0,
    UPDATE = 1,
    UPDATE_FROM_ERROR = 2,
    ERROR = 3,
    ERROR_FROM_ACTIVATION = 4,
    DEACTIVATE_CONNECTOR = 5
}
interface Action {
    type: ActionType;
    payload?: any;
}
export declare class Manager {
    private readonly store;
    private updateBusterValue;
    private previousConnector?;
    private unsubscribe;
    constructor(store?: import("redux").Store<Web3ReactManagerState, Action>);
    getStore: () => import("redux").Store<Web3ReactManagerState, Action>;
    activate: (connector: AbstractConnector, onError?: ((error: Error) => void) | undefined, throwErrors?: boolean) => Promise<void>;
    deactivate: () => void;
    setError: (error: Error) => void;
    handleDeactivate: () => void;
    handleError: (error: Error) => void;
    handleUpdate: (update: ConnectorUpdate) => Promise<void>;
    handleMount: () => void;
    handleUnmount: () => void;
}
export {};
