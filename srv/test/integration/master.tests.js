import MasterMock from './mock/master-mock';
import {createSlave} from './tools/mock-factory';
import Connector from './tools/connector';
import Until from './tools/until';

describe('Master socket', () => {

    it('can assume control of slave', async () => {
        // Using connector class to pair master and slave.
        const connector = new Connector('control');
        const paired = await connector.connect().paired();
        expect(paired).toBe(true);
    });

    it('fails to assume control of non-existing slave', async () => {
        // Using connector class to pair master and slave.
        const master = new MasterMock();
        const onMissingSlave = jest.fn();
        master.on('missing_slave', onMissingSlave);
        const connector = new Connector('incorrect_code', master, null, true);
        const paired = await connector.connect().paired();
        expect(paired).toBe(false);
        expect(onMissingSlave).toHaveBeenCalledTimes(1);
    });

    it('can execute supported types', async () => {
        let received = 0;

        // Create master and slave.
        const master = new MasterMock();
        const {slave, types} = createSlave(() => received++);

        // Connect and await pairing of master and slave.
        const connector = new Connector('master', master, slave).connect();
        await connector.paired();

        // Emit all supported types.
        for (let type in types)
            master.emit(type);

        // Wait until all types are received.
        const typeCount = Object.keys(types).length;
        await Until(() => received === typeCount);

        // Assert all types were received and handlers invoked.
        expect(received).toBe(typeCount);
        for (let type in types)
            expect(types[type]).toHaveBeenCalledTimes(1);
    });
});