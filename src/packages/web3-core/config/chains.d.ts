/**
 *
 * interface AddEthereumChainParameter {
 *   chainId: string; // A 0x-prefixed hexadecimal string
 *   chainName: string;
 *   nativeCurrency: {
 *     name: string;
 *     symbol: string; // 2-6 characters long
 *     decimals: 18;
 *   };
 *   rpcUrls: string[];
 *   blockExplorerUrls?: string[];
 *   iconUrls?: string[]; // Currently ignored.
 * }
 *
 */
export declare const chains: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
}[];
export declare const NetworkNames: {
    56: string;
    97: string;
    137: string;
    80001: string;
    43113: string;
    84531: string;
    42161: string;
    1: string;
};
export declare const ChainLogos: {
    56: (props: any) => import("react").JSX.Element;
    97: (props: any) => import("react").JSX.Element;
    80001: (props: any) => import("react").JSX.Element;
    137: (props: any) => import("react").JSX.Element;
    43113: (props: any) => import("react").JSX.Element;
    84531: (props: any) => import("react").JSX.Element;
    42161: (props: any) => import("react").JSX.Element;
    1: (props: any) => import("react").JSX.Element;
    4: (props: any) => import("react").JSX.Element;
    5: (props: any) => import("react").JSX.Element;
    6: (props: any) => import("react").JSX.Element;
};
export declare const ChainBgColor: {
    56: string;
    97: string;
    80001: string;
    137: string;
    43113: string;
    84531: string;
    42161: string;
    1: string;
    4: string;
    5: string;
    6: string;
};
export declare const explorer: {
    address: {
        56: string;
        97: string;
        1: string;
        80001: string;
        42161: string;
        43113: string;
        84531: string;
        137: string;
    };
    tx: {
        56: string;
        97: string;
        1: string;
        80001: string;
        42161: string;
        43113: string;
        84531: string;
        137: string;
    };
    block: {
        56: string;
        97: string;
        1: string;
        80001: string;
        42161: string;
        43113: string;
        84531: string;
        137: string;
    };
    token: {
        56: string;
        97: string;
        1: string;
        80001: string;
        42161: string;
        43113: string;
        84531: string;
        137: string;
    };
};
