import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {TabStyles as styles} from '../styles';

export class Tab extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.trapezoid, styles.tabBorder]}>
                    <View style={[styles.trapezoid, styles.tab]}>
                        {this.props.children}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

Tab.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.any,
};