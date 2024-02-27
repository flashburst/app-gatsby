import { JsonRpcProvider, type JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
export declare const getLibrary: (provider: any) => Web3Provider;
export declare const getProviderOrSigner: (_library: Web3Provider | JsonRpcProvider | undefined, account: string, networkId: number) => JsonRpcSigner;
export declare const getReadOnlyProvider: (networkId?: number) => JsonRpcSigner | undefined;
