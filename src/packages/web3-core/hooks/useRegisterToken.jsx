import { useCallback } from 'react';
import { registerToken as registerTokenUtil } from '../utils/register-token.js';
import { useWeb3React } from '../core/provider.jsx';
export const useRegisterToken = () => {
    const { connector } = useWeb3React();
    const registerToken = useCallback(async (tokenAddress, tokenSymbol, tokenDecimals, tokenImage) => {
        if (!connector) {
            return;
        }
        const provider = await connector.getProvider();
        if (!provider) {
            return;
        }
        return await registerTokenUtil(tokenAddress, tokenSymbol, tokenDecimals, tokenImage, provider);
    }, [connector]);
    return {
        registerToken
    };
};
