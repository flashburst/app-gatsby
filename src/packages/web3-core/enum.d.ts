declare enum ChainId {
    Invalid = 0,
    Ethereum = 1,
    BSC = 56,
    BaseGoerli = 84531,
    Mumbai = 80001,
    Fuji = 43113,
    Arbitrum = 42161
}
declare enum ConnectorNames {
    Injected = "injected",
    MetaMask = "metamask",
    OKXWallet = "okx-wallet",
    CoinbaseWallet = "coinbase-wallet",
    BitKeepWallet = "bitkeep-wallet",
    Gnosis = "gnosis",
    BinanceWallet = "binance-wallet"
}
interface Config {
    name: string;
    connectorName: ConnectorNames;
    Icon: any;
    isInstalled: () => boolean;
    getInstallationURL: () => string | undefined;
}
export { ChainId, ConnectorNames, type Config };
