const Socket = require('./socket');
const Debug = require('../tools/debug');

const codes = require('../memory/code-array');

const supportedTypes = [
    'declare_forms',
    'declare_anchors',
    'declare_videos'
];

class SlaveSocket extends Socket {

    constructor(identity, socket) {
        super(identity, socket, supportedTypes);
        this.setMaster(null);
        this.initCode();
    }

    initCode() {
        this.code = codes.generate();
        this.emit('assign_code', this.code);
        Debug.log(this.id + ' > slave code ' + this.code);
    }

    setMaster(master) {
        this.master = master;
    }

    // override
    onType(type, payload) {
        const success = this.declare(type, payload);
        if (success) {
            // Log declaration.
            const length = payload ? payload.length : 0;
            Debug.log(type, length, this.master.ip);
        }
    }

    declare(type, payload) {
        if (this.master) {
            // Declare payload to master.
            this.master.emit(type, payload);
            return true;
        }
        else return false;
    }

    // override
    onDisconnect() {
        if (this.master) {
            // Remove master's slave reference.
            this.master.setSlave(null);
            // Inform master that slave has gone missing.
            this.master.emit('missing_slave');
        }
        // Remove own code from codes array.
        codes.remove(this.code);
    }

    // override
    toObject() {
        const self = {
            ...super.toObject(),
            code: this.code
        };
        if (this.master)
            this.master = this.master.toString();
        return self;
    }

    toString() {
        return 'Slave ' + this.code;
    }
}

module.exports = exports = SlaveSocket;