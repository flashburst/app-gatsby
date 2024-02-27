import * as React from 'react'
import { Popup } from './connect-wallet/Popup';

const { ConnectWallet, ConnectorNames } = require("./packages/web3-core");

const SUPPORTED_NETWORKS = [1, 137, 80001, 42161, 56];

const SUPPORTED_CONNECTORS = [
  ConnectorNames.Injected,
  ConnectorNames.MetaMask,
  ConnectorNames.CoinbaseWallet,
  ConnectorNames.BitKeepWallet,
  ConnectorNames.BinanceWallet,
  ConnectorNames.OKXWallet,
  ConnectorNames.Gnosis,
];

export const RootElementWrapper = ({ children }) => {
  return (
    <>
      <ConnectWallet.Root
        getInitialNetwork={async () => null}
        connectors={SUPPORTED_CONNECTORS}
        supportedNetworks={SUPPORTED_NETWORKS}
      >
        {children}
        <Popup />
      </ConnectWallet.Root>
    </>
  );
};
