export declare const getProvider: () => {
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
} | undefined;
