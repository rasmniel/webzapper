const _ = require('lodash');

class InstanceMap {

    constructor() {
        this.map = {};
    }

    read(id) {
        return this.map[id];
    }

    add(id, value) {
        this.map[id] = value;
    }

    remove(id) {
        delete this.map[id];
    }

    find(property, value) {
        for (let id in this.map) {
            const instance = this.map[id];
            if (instance && instance[property] === value) {
                return instance;
            }
        }
        return null;
    }

    count() {
        return Object.keys(this.map).length;
    }

    clone() {
        return _.cloneDeep(this.map);
    }
}

module.exports = exports = new InstanceMap();