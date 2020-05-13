import MockSocket from './mock-socket';

const supportedTypes = [
    'navigate_tab',
    'navigate_url',
    'navigate_history',

    'request_inputs',
    'request_forms',
    'request_anchors',

    'change_input',
    'control_video',
    'submit_form',
    'click_element',
    'smooth_scroll',
];

export default
class SlaveMock extends MockSocket {

    constructor(host) {
        super(host, 'slave');
    }

    connect() {
        super.connect();

        this.socket.on('connect', () => {
            this.event('connect');
            this.socket.emit('slave_confirm');
        });

        this.socket.on('assign_code', (code) => {
            this.event('assign_code', code);
        });

        this.socket.on('disconnect', () => {
            this.warning('Disconnected')
        });

        this.socket.on('error', (error) => {
            this.warning('Error', error)
        });

        this.socket.on('new_master', () => {
            this.event('new_master');
            for (let type of supportedTypes) {
                this.socket.on(type, (payload) => {
                    this.event(type, payload);
                });
            }
        });
    }

    static getSupportedTypes() {
        return supportedTypes;
    }
}