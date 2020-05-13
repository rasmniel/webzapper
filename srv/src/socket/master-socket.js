const Socket = require('./socket');
const Debug = require('../tools/debug');

const map = require('../memory/instance-map');

const supportedTypes = [
    'request_inputs',
    'request_forms',
    'request_anchors',
    'navigate_tab',
    'navigate_url',
    'navigate_history',
    'change_input',
    'control_video',
    'submit_form',
    'click_element',
    'smooth_scroll',
    'scroll_y',
];

class MasterSocket extends Socket {

    constructor(identity, socket) {
        super(identity, socket, supportedTypes);
        this.setSlave(null);
        this.socket.on('request_slave', this.requestSlave.bind(this));
    }

    requestSlave(code) {
        // Look for a potential slave with the specified code.
        let slave = map.find('code', code);
        if (slave) {
            // Tell the slave of it's master.
            slave.setMaster(this);
            // Assign the slave to the master.
            this.setSlave(slave);
            if (this.commandSlave('new_master')) {
                this.emit('slave_granted', code);
                Debug.log(this.id + ' requested slave > ' + code);
            }
        }
        else {
            // Specified slave code does not exist.
            Debug.log('Slave "' + code + '" does not exist');
            Debug.logMap();
            this.emit('missing_slave');
        }
    }

    setSlave(slave) {
        this.slave = slave;
    }

    // override
    onType(type, payload) {
        // Request execution by slave.
        const success = this.commandSlave(type, payload);
        if (success) {
            // Log request.
            Debug.log(this.id, type, payload);
        }
    }

    commandSlave(type, payload) {
        if (this.slave) {
            payload = payload || '';
            this.slave.emit(type, payload);
            return true;
        }
        else {
            this.emit('missing_slave');
            return false;
        }
    }

    // override
    onDisconnect() {
        if (this.slave) {
            // Remove slave's master reference.
            this.slave.setMaster(null);
        }
    }

    // override
    toObject() {
        const self = super.toObject();
        if (this.slave)
            this.slave = this.slave.toString();
        return self
    }

    toString() {
        return 'Master ' + this.id;
    }
}

module.exports = exports = MasterSocket;
