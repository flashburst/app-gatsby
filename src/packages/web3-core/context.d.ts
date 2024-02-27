import React, { type ReactNode } from 'react';
import { type Config, type ConnectorNames } from './enum.js';
import { type JsonRpcSigner } from '@ethersproject/providers';
export declare function useConnectWallet(): {
    isActive: boolean;
    logout: () => void;
    openPopup: () => void;
    login: (connectorName: ConnectorNames) => Promise<void>;
    switchNetwork: (networkId?: number | undefined) => Promise<void>;
    signerOrProvider?: JsonRpcSigner | undefined;
    connectedChainId?: number | undefined;
    selectedChainId?: number | undefined;
    setSelectedChainId: React.Dispatch<React.SetStateAction<number | undefined>>;
    account: string | null | undefined;
};
export declare function useConnectWalletPopup(): {
    wallets: (Config & {
        id: number;
    })[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isConnecting: boolean;
};
interface ProviderProps {
    children?: ReactNode;
    connectors: any[];
    supportedNetworks: number[];
    getInitialNetwork: () => Promise<number | null>;
}
export declare const ConnectWallet: {
    Root: ({ children, connectors, getInitialNetwork, supportedNetworks }: ProviderProps) => React.JSX.Element;
};
export {};
