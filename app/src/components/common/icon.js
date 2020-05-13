import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {IconStyles} from '../styles';
import {Colors} from '../styles/globals';

export class Icon extends React.Component {
    render() {
        return (
            <MaterialIcon
                size={20}
                color={Colors.dark}
                {...this.props}
                style={[IconStyles.icon, this.props.style]}
            />
        );
    }

    setNativeProps(nativeProps) {
        // Must implement setNativeProps to be a child of touchable component,
        // but do nothing with native props.
    }
}

Icon.propTypes = {
    style: PropTypes.any,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
};