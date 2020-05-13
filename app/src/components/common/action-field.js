import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {Touch, TextField} from './';
import {ActionFieldStyles as styles} from '../styles';

export class ActionField extends React.Component {

    render() {
        return (
            <View style={[styles.wrapper, this.props.style]}>
                <TextField
                    {...this.props}
                    onSubmitEditing={this.props.onPress}
                    style={styles.urlInput}
                />
                <Touch
                    onPress={this.props.onPress}
                    style={styles.action}
                >
                    {this.props.children}
                </Touch>
            </View>
        );
    }
}

ActionField.propTypes = {
    style: PropTypes.any,
    fontSize: PropTypes.number,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    autoCapitalize: PropTypes.string,
    keyboardType: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
};