import SafeAppsSDK from '@safe-global/safe-apps-sdk';
import { SafeAppProvider } from '@safe-global/safe-apps-provider';
// eslint-disable-next-line new-cap
const getNewSDK = (opts) => new SafeAppsSDK.default(opts);
export { SafeAppProvider, getNewSDK };
