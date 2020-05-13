const argv = require('yargs').argv;

const map = require('../memory/instance-map');
const codes = require('../memory/code-array');

const _log = argv.dev;

class Debug {

    log() {
        if (!_log) return;
        // Log message delimiter.
        console.log('========================>');
        // console.log messages in arguments array.
        for (let arg of arguments) {
            if (arg) console.log(arg);
        }
        // End with new line marker.
        console.log('\t|');
    }

    logMap() {
        // Create a list of participants from instance map.
        const array = [];
        const clone = map.clone();
        for (let key in clone) {
            if (clone.hasOwnProperty(key)) {
                // Add existing sockets to array.
                const socket = clone[key];
                array.push(socket.toObject());
            }
        }
        // Log participant map
        this.log('Participant array > ', array);
    }

    logCodes() {
        this.log(codes);
    }

    logConnectionCount(message) {
        // Determine remaining participants.
        const participants = Object.keys(map.clone()).length;
        // Determine a message for describing connections.
        let description = 'No active connections.';
        if (participants) {
            if (participants === 1)
                description = participants + ' open connections.';
            else description = '1 open connections.';
        }
        // Log message and description.
        this.log(message, description);
    }
}

module.exports = exports = new Debug();