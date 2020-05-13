import React from 'react';
import PropTypes from 'prop-types';

export default
class ConnectButton extends React.Component {
    render() {
        return (
            <div className="connect-button">
                {this.renderCode()}
                <a className="button" onClick={this.props.onClick}>
                    <i className="material-icons">
                        {this.getIconName()}
                    </i>
                </a>
            </div>
        );
    }

    renderCode() {
        if (this.props.code) {
            return (
                <div className="code">
                    {this.props.code}
                </div>
            );
        }
    }

    getIconName() {
        let icon = 'tap_and_play';
        if (this.props.code)
            icon = 'phonelink_erase';
        else if (this.props.loading)
            icon = 'settings_remote';
        return icon;
    }
}

ConnectButton.propTypes = {
    loading: PropTypes.bool,
    code: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};