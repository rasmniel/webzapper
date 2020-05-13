import React from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';

import {TextFieldStyles as styles} from '../styles';

export class TextField extends React.Component {
    render() {
        return (
            <TextInput
                {...this.props}
                children={null}
                style={[styles.input, this.props.style, {fontSize: this.props.fontSize}]}
                textAlignVertical={(this.props.multiline ? 'top' : 'center')}
                underlineColorAndroid="transparent"
            />
        );
    }
}

TextField.propTypes = {
    style: PropTypes.any,
    fontSize: PropTypes.number,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func,
    autoCapitalize: PropTypes.string,
    keyboardType: PropTypes.string,
};