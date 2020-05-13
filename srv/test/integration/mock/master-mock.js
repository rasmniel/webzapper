import MockSocket from './mock-socket';

const supportedTypes = [
    'declare_forms',
    'declare_anchors',
    'declare_videos'
];

export default
class MasterMock extends MockSocket {

    constructor(host) {
        super(host, 'master');
    }

    connect() {
        super.connect();

        this.socket.on('connect', () => {
            this.event('connect');
            this.socket.emit('master_confirm');
        });

        this.socket.on('slave_granted', () => {
            this.event('slave_granted');
        });

        this.socket.on('missing_slave', () => {
            this.event('missing_slave');
        });

        this.socket.on('disconnect', () => {
            this.event('disconnect');
            this.warning('Disconnected.');
        });

        this.socket.on('error', (error) => {
            this.warning('Error', error);
        });

        for (let type of supportedTypes) {
            this.socket.on(type, (payload) => {
                this.event(type, payload);
            });
        }
    }

    static getSupportedTypes() {
        return supportedTypes;
    }
}