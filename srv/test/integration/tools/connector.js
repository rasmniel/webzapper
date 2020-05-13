import MasterMock from '../mock/master-mock';
import SlaveMock from '../mock/slave-mock';
import Until from './until';

export default
class Connector {
    constructor(identity, master, slave, mockCode) {
        this.master = master;
        this.masterHasSlave = false;
        this.masterSetup(identity);

        this.slave = slave;
        this.slaveHasMaster = false;
        this.mockCode = mockCode;
        this.slaveSetup(identity);
    }

    masterSetup(identity) {
        this.master = this.master || new MasterMock();
        this.masterHasSlave = false;
        this.master.setIdentity(identity);
        this.master.on('slave_granted', () =>
            this.masterHasSlave = true);
    }

    slaveSetup(identity) {
        this.slave = this.slave || new SlaveMock();
        this.slaveHasMaster = false;
        this.slave.setIdentity(identity);
        this.slave.on('assign_code', (code) => {
            if (this.mockCode) code = 'incorrect_code';
            this.master.emit('request_slave', code)
        });
        this.slave.on('new_master', () =>
            this.slaveHasMaster = true);
    }

    connect() {
        this.slave.connect();
        this.master.connect();
        return this;
    }

    paired() {
        return Until(() => this.slaveHasMaster && this.masterHasSlave);
    }
}