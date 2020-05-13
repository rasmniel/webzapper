import SocketIO from 'socket.io-client';
import * as Types from '../types';
import HashCache from './hash-cache';

const supportedTypes = [
    Types.NAVIGATE_TAB,
    Types.NAVIGATE_URL,
    Types.NAVIGATE_HISTORY,

    Types.REQUEST_INPUTS,
    Types.REQUEST_FORMS,
    Types.REQUEST_ANCHORS,

    Types.CHANGE_INPUT,
    Types.CONTROL_VIDEO,
    Types.SUBMIT_FORM,
    Types.CLICK_ELEMENT,
    Types.SMOOTH_SCROLL,
];

export default
class Socket {

    constructor(dispatch, host, fingerprint) {
        this.dispatch = dispatch;
        this.host = host;
        this.fingerprint = fingerprint;
        this.socket = null;
        this.code = '';
        this.slaveHasMaster = false;
        this.cache = new HashCache();
        this.onConnectCallback = null;
        this.onDisconnectCallback = null;
    }

    initSocket() {
        // Initialize socket.
        this.socket = SocketIO.connect(this.host, {
            query: 'identity=' + this.fingerprint
        });

        const logConnection = () => console.log('Connected to server:', this.socket.connected);

        this.socket.on('connect', () => {
            logConnection();
            this.socket.emit('slave_confirm');
        });

        this.socket.on('assign_code', (code) => {
            this.code = code;
            if (this.onConnectCallback)
                this.onConnectCallback(code);
        });

        this.socket.on('disconnect', () => {
            logConnection();
            this.code = '';
            if (this.onDisconnectCallback)
                this.onDisconnectCallback();
        });

        this.socket.on('error', (error) => {
            console.warn('An error has occurred:', error);
            logConnection();
        });

        // On pairing with new master.
        this.socket.on('new_master', () => {
            this.slaveHasMaster = true;
            this.cache = new HashCache();
            // When new master connects, dispatch input request.
            this.dispatch({
                type: Types.REQUEST_INPUTS,
            });
            // Listen for incoming types to dispatch.
            for (let type of supportedTypes) {
                // Initialize handler for all supported types.
                this.socket.on(type, (payload) => {
                    this.dispatch({
                        type: type,
                        payload: payload
                    });
                });
            }
        });
    }

    connect() {
        // If there's a socket, open connection
        if (this.socket)
            this.socket.open();
        // Otherwise initialize socket.
        else this.initSocket();
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.code = '';
            if (this.onDisconnectCallback)
                this.onDisconnectCallback();
        }
    }

    onConnect(callback) {
        this.onConnectCallback = callback;
    }

    onDisconnect(callback) {
        this.onDisconnectCallback = callback;
    }

    connected() {
        return this.socket && this.socket.connected;
    }

    emit(action) {
        if (this.connected() && this.slaveHasMaster && this.cacheCheck(action))
            this.socket.emit(action.type, action.payload);
    }

    cacheCheck(action) {
        const type = action.type;
        // Check actions' types for forms and videos declaration.
        if (type === Types.DECLARE_FORMS ||
            type === Types.DECLARE_VIDEOS) {
            // Perform has comparison on payload to avoid sending redundant data.
            return this.cache.hashCheck(action);
        }
        return true;
    }
}
