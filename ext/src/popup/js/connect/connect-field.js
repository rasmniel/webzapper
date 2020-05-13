import React from 'react';
import ConnectButton from './connect-button';
import Badge from '../badge';

export default
class ConnectField extends React.Component {

    constructor() {
        super();
        this.state = {
            code: '',
            connecting: false,
            didConnect: false
        };
        this.app = chrome.extension.getBackgroundPage();
        this.initSocket();

        // Reset badge if no connection is active.
        if (!this.socket.connected())
            Badge.reset();
    }

    initSocket() {
        const socket = this.app.getSocket();
        // Add event handlers to the socket.
        socket.onConnect(this.onConnect.bind(this));
        socket.onDisconnect(this.onDisconnect.bind(this));

        this.socket = socket;
    }

    componentWillMount() {
        // If there's no code on state, attempt to get the code form the socket.
        if (!this.state.code && this.socket && this.socket.code)
            this.setCode(this.socket.code);
    }

    render() {
        return (
            <div className="connect-field">
                {this.renderConnected()}
                <ConnectButton
                    code={this.state.code}
                    onClick={this.toggleConnection.bind(this)}
                    loading={this.state.connecting}
                />
            </div>
        );
    }

    renderConnected() {
        if (this.state.didConnect && this.state.code) {
            return <p className="connect-message">Connected!</p>;
        }
    }

    onConnect(code) {
        this.setState({
            code: code,
            didConnect: true,
            connecting: false
        });
        Badge.set('Conn', '#90B05A');
    }

    onDisconnect() {
        this.setCode('');
        Badge.set('Disc', '#7F170F');
    }

    toggleConnection() {
        if (this.socket.connected()) {
            this.socket.disconnect();
        }
        else if (this.socket && !this.state.connecting) {
            this.socket.connect();
            this.setState({connecting: true});
        }
    }

    setCode(code) {
        this.setState({code: code});
    }
}
