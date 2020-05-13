import React from 'react';
import {View, Animated} from 'react-native';
import PropTypes from 'prop-types';

import {Tab} from '../common';
import {TabsStyles as styles} from '../styles';

export default
class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.animation = new Animated.Value(0);
        this.setEnabled(this.props.disabled);
    }

    render() {
        return (
            <View
                style={[styles.wrapper, this.props.style]}
            >
                <View style={styles.background}/>

                <Animated.View style={{right: this.animation}}>
                    <Tab onPress={this.props.onBack}>
                    </Tab>
                </Animated.View>

                <View style={styles.childWrapper}>
                    {this.props.children}
                </View>

                <Animated.View style={{left: this.animation}}>
                    <Tab onPress={this.props.onNext}>
                    </Tab>
                </Animated.View>

            </View>
        );
    }

    componentDidUpdate() {
        this.setEnabled(this.props.disabled);
    }

    setEnabled(enabled) {
        const value = enabled ? 200 : 0;
        Animated.spring(this.animation, {toValue: value}).start();
    }
};

Tabs.propTypes = {
    style: PropTypes.any,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};