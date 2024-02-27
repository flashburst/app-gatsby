// https://github.com/MetaMask/metamask-extension/issues/3133#issuecomment-1025641185
import { isFirefox } from '../vendor/user-agent.js';
async function setupMetamaskForFirefox() {
    // Return if window.ethereum is present or if the browser is not firefox
    console.log('test setupMetamaskForFirefox');
    if (!isFirefox() || typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
        return;
    }
    const { initializeProvider } = await import('@metamask/providers');
    const { WindowPostMessageStream } = await import('@metamask/post-message-stream');
    // Create a stream to a remote provider:
    const connectionStream = new WindowPostMessageStream({
        name: 'metamask-inpage',
        target: 'metamask-contentscript'
    });
    // Initialize the provider and set it as window.ethereum
    // @ts-expect-error
    initializeProvider({ connectionStream, shouldShimWeb3: true });
}
export { setupMetamaskForFirefox };
