const Identity = require('./identity');

// abstract
class Socket extends Identity {

    constructor({id, ip, ua}, socket, types) {
        super(id, ip, ua);
        this.socket = socket;
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.initTypes(types);
    }

    initTypes(types) {
        // Add handlers for incoming supported types.
        for (let type of types) {
            this.socket.on(type, this.getTypeHandler(type));
        }
    }

    emit(type, payload) {
        // Emit from socket.
        this.socket.emit(type, payload);
    }

    getTypeHandler(type) {
        return (payload) => {
            this.onType(type, payload);
        };
    }

    // abstract
    onType(type, payload) {
        throw new Error('Must implement function "onType(type, payload)" in subclass.');
    }

    // abstract
    onDisconnect() {
        throw new Error('On disconnect not implemented by subclass.');
    }

    toObject() {
        // Create an object with core properties.
        return {
            id: this.id,
            ip: this.ip,
            ua: this.ua
        }
    }
}

module.exports = exports = Socket;