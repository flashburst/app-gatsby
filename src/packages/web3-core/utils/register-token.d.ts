import { type ExternalProvider } from '@ethersproject/providers';
/**
 * Prompt the user to add a custom token to metamask
 * returns true if the token has been added, false otherwise
 */
export declare const registerToken: (tokenAddress: string, tokenSymbol: string, tokenDecimals: number, tokenImage?: string, provider?: ExternalProvider) => Promise<boolean>;
