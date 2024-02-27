/* eslint-disable no-prototype-builtins */
export function parseSendReturn(sendReturn) {
    return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn;
}
