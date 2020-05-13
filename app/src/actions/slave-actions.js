import * as Slave from '../types/slave-types';

import {emit} from '../actions/socket-actions';

export const onSlaveError = (message) => {
    return {
        type: Slave.SLAVE_ERROR,
        payload: message
    };
};

export const setSlaveCode = (value) => {
    return {
        type: Slave.SET_SLAVE_CODE,
        payload: value.toUpperCase()
    };
};

export const requestSlave = (slaveCode) => {
    return (dispatch) => {
        dispatch({
            type: Slave.REQUEST_SLAVE_START
        });
        const didEmit = emit('request_slave', slaveCode);
        if (!didEmit) {
            dispatch({
                type: Slave.REQUEST_SLAVE_ERROR,
                payload: 'Requesting slave failed.'
            });
        }
    }
};