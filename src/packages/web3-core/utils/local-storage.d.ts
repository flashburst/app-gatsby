declare function trackConnector(value: any): void;
declare function trackChain(value: any): void;
declare function getConnector(): string | null;
declare function getChain(): string | null;
declare function clear(): void;
declare const walletTrackerLS: {
    trackConnector: typeof trackConnector;
    trackChain: typeof trackChain;
    getConnector: typeof getConnector;
    getChain: typeof getChain;
    clear: typeof clear;
};
export { walletTrackerLS };
