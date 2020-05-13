import MasterMock from './mock/master-mock';
import SlaveMock from './mock/slave-mock';

describe('Socket entry point', () => {

    it('will kick unidentifiable connection', (done) => {
        const unidentified = new MasterMock();
        unidentified.setUnidentified();
        unidentified.on('disconnect', () => done());
        unidentified.connect();
    });

    it('will accept master connection', (done) => {
        const master = new MasterMock();
        master.setIdentity('connect');
        master.on('connect', () => done());
        master.connect();
    });

    it('will accept slave connection', (done) => {
        const slave = new SlaveMock();
        slave.setIdentity('connect');
        slave.on('connect', () => done());
        slave.connect();
    });
});