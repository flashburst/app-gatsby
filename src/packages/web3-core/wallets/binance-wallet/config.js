import { ConnectorNames } from '../../enum.js';
import { getProvider } from './provider.js';
import BinanceWalletLogo from '../../logos/BinanceWalletLogo.jsx';
import { isMobile } from '../../vendor/user-agent.js';
const isInstalled = () => !!getProvider();
const getInstallationURL = () => {
    if (isMobile()) {
        return;
    }
    return 'https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp';
};
const Icon = BinanceWalletLogo;
const name = 'Binance Chain Wallet';
const connectorName = ConnectorNames.BinanceWallet;
export const config = {
    name,
    connectorName,
    Icon,
    isInstalled,
    getInstallationURL
};
