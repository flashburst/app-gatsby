import { useCallback, useEffect } from 'react';
import { ConnectorEvent } from '@web3-react/types';
import { useWeb3React } from '../core/index.js';
import { NOOP } from '../utils/no-op.js';
export function useDeactivator({ onDeactivate = NOOP } = {}) {
    const { deactivate, connector } = useWeb3React();
    useEffect(() => {
        if (!connector) {
            return;
        }
        connector.on(ConnectorEvent.Deactivate, onDeactivate);
        return () => {
            connector.off(ConnectorEvent.Deactivate, onDeactivate);
        };
    }, [connector, onDeactivate]);
    const logout = useCallback(() => {
        onDeactivate();
        deactivate();
    }, [deactivate, onDeactivate]);
    return logout;
}
