import { ConnectorNames } from '../../enum.js';
import { getProvider } from './provider.js';
import CoinbaseLogo from '../../logos/CoinbaseLogo.jsx';
const isInstalled = () => !!getProvider();
const getInstallationURL = () => 'https://www.coinbase.com/wallet/downloads';
const Icon = CoinbaseLogo;
const name = 'Coinbase Wallet';
const connectorName = ConnectorNames.CoinbaseWallet;
export const config = {
    name,
    connectorName,
    Icon,
    isInstalled,
    getInstallationURL
};
