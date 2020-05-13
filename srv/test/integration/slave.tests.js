import SlaveMock from './mock/slave-mock';
import {createMaster} from './tools/mock-factory';
import Connector from './tools/connector';
import Until from './tools/until';

describe('Slave socket', () => {

    it('can assign verification code', (done) => {
        const slave = new SlaveMock();
        slave.setIdentity('code');
        slave.on('assign_code', (code) => {
            expect(typeof(code)).toBe('string');
            expect(code.length).toBeGreaterThan(0);
            done();
        });
        slave.connect();
    });

    it('can execute supported types', async () => {
        let received = 0;

        // Create master and slave.
        const slave = new SlaveMock();
        const {master, types} = createMaster(() => received++);

        // Connect and await pairing of master and slave.
        const connector = new Connector('slave', master, slave).connect();
        await connector.paired();

        // Emit all supported types with payload.
        const mockPayload = ['mock_payload'];
        for (let type in types)
            slave.emit(type, mockPayload);

        // Wait until all types are received.
        const typeCount = Object.keys(types).length;
        await Until(() => received === typeCount);

        // Assert all types were received and handlers invoked with payload.
        expect(received).toBe(typeCount);
        for (let type in types) {
            expect(types[type]).toHaveBeenCalledTimes(1);
            expect(types[type]).toHaveBeenCalledWith(mockPayload);
        }
    });
});