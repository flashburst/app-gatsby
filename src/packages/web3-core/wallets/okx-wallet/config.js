import { ConnectorNames } from '../../enum.js';
import { getProvider } from './provider.js';
import OKXWalletLogo from '../../logos/OKXWalletLogo.jsx';
const isInstalled = () => !!getProvider();
const getInstallationURL = () => 'https://www.okx.com/download';
const Icon = OKXWalletLogo;
const name = 'OKX Wallet';
const connectorName = ConnectorNames.OKXWallet;
export const config = {
    name,
    connectorName,
    Icon,
    isInstalled,
    getInstallationURL
};
