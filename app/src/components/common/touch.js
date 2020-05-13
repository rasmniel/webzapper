import React from 'react';
import {TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

import {ComponentStyles as styles} from '../styles';
import {Colors} from '../styles/globals';

export class Touch extends React.Component {
    render() {
        return (
            <TouchableHighlight
                {...this.props}
                style={[styles.centerContent, this.props.style]}
                underlayColor={Colors.gray}
            >
                {this.props.children}
            </TouchableHighlight>
        );
    }
}

Touch.propTypes = {
    style: PropTypes.any,
    children: PropTypes.any.isRequired,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
};