import { useCallback } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '../core/index.js';
import { NetworkNames } from '../config/chains.js';
import { getConnectorByName } from '../wallets/connectors.js';
import { CustomException } from '../utils/CustomException.js';
import { NOOP } from '../utils/no-op.js';
const activateWithConnector = async (activate, connector) => {
    try {
        await activate(connector, undefined, true);
        return {
            activated: true,
            error: null
        };
    }
    catch (error) {
        return {
            activated: false,
            error
        };
    }
};
export function useActivator({ onDeactivate = NOOP, onActivate = NOOP } = {}) {
    const { activate } = useWeb3React();
    const login = useCallback(async (networkId, connectorName) => {
        if (!networkId) {
            console.log('Please select a network'); // alert is not called when the document is sandboxed
            window.alert('Please select a network');
            return;
        }
        const connector = await getConnectorByName(connectorName, networkId);
        if (!connector) {
            console.info('Invalid connector', connectorName, networkId);
            return;
        }
        try {
            let activationData = await activateWithConnector(activate, connector);
            const error = activationData.error;
            // if activated successfully, store the connector name in local storage
            if (activationData.activated) {
                onActivate(connectorName, networkId);
                return;
            }
            if (!error) {
                // Unreachable code
                throw CustomException({
                    type: 'error',
                    title: 'Error',
                    message: 'Activation failed. But error is not available. Please contact support.'
                });
            }
            if (error && !(error instanceof UnsupportedChainIdError)) {
                // Error handler throws an error object with more details
                connector.handleError(error);
            }
            // if chain is not supported, add chain to the wallet
            const isSuccess = await connector.setupNetwork(networkId);
            if (!isSuccess) {
                throw CustomException({
                    type: 'error',
                    title: 'Wrong network',
                    message: `Please switch to ${NetworkNames[networkId]} in your ${connector.NAME}`,
                    error
                });
            }
            // try to activate again after adding the chain
            activationData = await activateWithConnector(activate, connector);
            if (activationData.activated) {
                onActivate(connectorName, networkId);
                return;
            }
            throw activationData.error;
        }
        catch (error) {
            onDeactivate();
            console.log(error.message); // alert is not called when the document is sandboxed
            window.alert(error.message);
            console.error(error);
            console.error(error.error);
            // throw CustomException({
            //   type: 'error',
            //   title: 'Error',
            //   message: 'Something went wrong',
            //   error: error
            // })
        }
    }, [activate, onActivate, onDeactivate]);
    return login;
}
