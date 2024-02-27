var ChainId;
(function (ChainId) {
    ChainId[ChainId["Invalid"] = 0] = "Invalid";
    ChainId[ChainId["Ethereum"] = 1] = "Ethereum";
    ChainId[ChainId["BSC"] = 56] = "BSC";
    ChainId[ChainId["BaseGoerli"] = 84531] = "BaseGoerli";
    ChainId[ChainId["Mumbai"] = 80001] = "Mumbai";
    ChainId[ChainId["Fuji"] = 43113] = "Fuji";
    ChainId[ChainId["Arbitrum"] = 42161] = "Arbitrum";
})(ChainId || (ChainId = {}));
var ConnectorNames;
(function (ConnectorNames) {
    ConnectorNames["Injected"] = "injected";
    ConnectorNames["MetaMask"] = "metamask";
    ConnectorNames["OKXWallet"] = "okx-wallet";
    ConnectorNames["CoinbaseWallet"] = "coinbase-wallet";
    ConnectorNames["BitKeepWallet"] = "bitkeep-wallet";
    ConnectorNames["Gnosis"] = "gnosis";
    ConnectorNames["BinanceWallet"] = "binance-wallet";
})(ConnectorNames || (ConnectorNames = {}));
export { ChainId, ConnectorNames };
