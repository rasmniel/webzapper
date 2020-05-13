import {Keyboard} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SocketIO from 'socket.io-client';

import * as Slave from '../types/slave-types';
import * as Input from '../types/input-types';

let socket;
let countdown;

const host = 'http://localhost:3000';

const supportedTypes = [
    Input.DECLARE_FORMS,
    Input.DECLARE_ANCHORS,
    Input.DECLARE_VIDEOS
];

export const initSocket = () => {
    return (dispatch) => {

        const id = DeviceInfo.getUniqueID();
        // Must apply websocket transport to connect on Android.
        socket = new SocketIO(host, {
            query: 'identity=' + id,
            transports: ['websocket']
        });

        socket.on('connect', () => {
            socket.emit('master_confirm');
        });

        socket.on('slave_granted', () => {
            stopCountdown();
            Keyboard.dismiss();
            dispatch({
                type: Slave.REQUEST_SLAVE_SUCCESS
            });
        });

        socket.on('missing_slave', () => {
            stopCountdown();
            dispatch({
                type: Slave.REQUEST_SLAVE_ERROR,
                payload: 'Incorrect slave code.'
            });
        });

        socket.on('disconnect', () => {
            dispatch({
                type: Slave.REQUEST_SLAVE_ERROR,
                payload: 'Disconnected from server.'
            });
        });

        for (let type of supportedTypes) {
            socket.on(type, (payload) => {
                dispatch({
                    type: type,
                    payload: payload
                });
            });
        }
    };
};

export const emit = (type, payload) => {
    if (socket)
        return socket.emit(type, payload);
    else console.warn(type, payload);
    return true;
};

export const setConnected = (connection) => {
    if (socket) {
        if (connection)
            socket.connect();
        else
            socket.disconnect();
    }
};

const COUNTDOWN_TIME = 10 * 1000;
export const startCountdown = (timeout) => {
    countdown = setTimeout(() => {
        timeout();
    }, COUNTDOWN_TIME);
};

export const stopCountdown = () => {
    clearTimeout(countdown);
};