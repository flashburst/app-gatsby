import { AbstractConnector } from '../../vendor/web3-react.js';
import { ConnectorNames } from '../../enum.js';
declare class SafeAppConnector extends AbstractConnector {
    readonly NAME = "Gnosis Safe Wallet";
    readonly CONNECTOR_NAME = ConnectorNames.Gnosis;
    private readonly sdk;
    private safe;
    private provider;
    constructor(opts: any);
    activate(): Promise<{
        provider: any;
        chainId: string | number;
        account: string | null;
    }>;
    getSafeInfo(): Promise<any>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): void;
    isSafeApp(): Promise<boolean>;
    setupNetwork(_networkId: number): Promise<boolean>;
    handleError(error: any): never;
}
export { SafeAppConnector };
