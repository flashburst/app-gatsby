import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorNames } from '../../enum.js';
export declare class InjectedConnector extends AbstractConnector {
    readonly NAME = "Injected Web3 Wallet";
    readonly CONNECTOR_NAME = ConnectorNames.Injected;
    constructor(kwargs: any);
    handleChainChanged(chainId: string): void;
    handleAccountsChanged(accounts: string[]): void;
    handleClose(code: number, reason: string): void;
    handleNetworkChanged(chainId: string): void;
    activate(): Promise<{
        provider: {
            [key: string]: any;
            on?: {
                (name: "accountsChanged", handler: (accounts: string[]) => void): any;
                (name: "networkChanged", handler: (networkId: string) => void): any;
                (name: "chainChanged", handler: (chainId: string) => void): any;
                (name: "connect", handler: (connectInfo: ConnectInfo) => void): any;
                (name: "disconnect", handler: (error: ProviderRpcError) => void): any;
                (name: "close", handler: (code: number, reason: string) => void): any;
                (name: "message", handler: (message: ProviderMessage) => void): any;
            } | undefined;
        };
    } & ({
        account: any;
    } | {
        account?: undefined;
    })>;
    getProvider(): Promise<{
        [key: string]: any;
        on?: {
            (name: "accountsChanged", handler: (accounts: string[]) => void): any;
            (name: "networkChanged", handler: (networkId: string) => void): any;
            (name: "chainChanged", handler: (chainId: string) => void): any;
            (name: "connect", handler: (connectInfo: ConnectInfo) => void): any;
            (name: "disconnect", handler: (error: ProviderRpcError) => void): any;
            (name: "close", handler: (code: number, reason: string) => void): any;
            (name: "message", handler: (message: ProviderMessage) => void): any;
        } | undefined;
    } | undefined>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): void;
    isAuthorized(): Promise<any>;
    setupNetwork(networkId: number): Promise<boolean>;
    handleError(error: any): never;
}
