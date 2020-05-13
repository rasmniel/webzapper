import MasterMock from '../mock/master-mock';
import SlaveMock from '../mock/slave-mock';

export const createMaster = (callback) => {
    const master = new MasterMock();
    const supportedTypes = MasterMock.getSupportedTypes();
    const types = initTypes(supportedTypes);
    initSocket(master, types, callback);
    return {
        master: master,
        types: types
    };
};

export const createSlave = (callback) => {
    const slave = new SlaveMock();
    const supportedTypes = SlaveMock.getSupportedTypes();
    const types = initTypes(supportedTypes);
    initSocket(slave, types, callback);
    return {
        slave: slave,
        types: types
    };
};

const initSocket = (socket, types, callback) => {
    for (let type in types) {
        socket.on(type, (payload) => {
            if (callback) callback();
            types[type](payload);
        });
    }
};

const initTypes = (types) => {
    const typeObject = {};
    for (let type of types) {
        typeObject[type] = jest.fn();
    }
    return typeObject;
};