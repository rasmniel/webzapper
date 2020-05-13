import SocketIO from 'socket.io-client';

export default
class MockSocket {

    constructor(host = 'http://localhost:3000', mock) {
        this.host = host;
        this.mock = mock;
        this.mockprint = '';
        this.socket = null;
        this.events = {};
        this.identified = false;
    }

    setIdentity(identity) {
        this.mockprint = identity + '_mock_' + this.mock;
        this.identified = true;
    }

    setUnidentified() {
        this.mockprint = '';
        this.identified = false;
    }

    connect() {
        if (this.identified && !this.mockprint)
            throw new Error('Must give mock socket an identity using setIdentity(string), or setUnidentified()');
        this.socket = SocketIO.connect(this.host, {
            query: 'identity=' + this.mockprint,
            transports: ['websocket']
        });
    }

    emit(type, payload) {
        this.socket.emit(type, payload);
    }

    on(type, callback) {
        if (Array.isArray(this.events[type]))
            this.events[type].push(callback);
        else
            this.events[type] = [callback];
    }

    event(type, payload) {
        if (this.events[type]) for (let callback of this.events[type]) {
            callback(payload);
        }
    }

    warning(message, payload) {
        if (this.mockprint)
            console.warn(this.mockprint + ': ' + message, payload);
    }
}