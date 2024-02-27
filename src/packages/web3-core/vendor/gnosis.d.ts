import SafeAppsSDK from '@safe-global/safe-apps-sdk';
import { SafeAppProvider } from '@safe-global/safe-apps-provider';
declare const getNewSDK: (opts: SafeAppsSDK.Opts) => import("@safe-global/safe-apps-sdk/dist/src/sdk.js").default;
export { SafeAppProvider, getNewSDK };
