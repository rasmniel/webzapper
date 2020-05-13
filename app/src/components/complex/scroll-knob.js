import React from 'react';
import {View, PanResponder, Animated} from 'react-native';
import PropTypes from 'prop-types';

import {Icon} from '../common';
import {KNOB_RADIUS, ScrollKnobStyles as styles} from '../styles';

import {Colors} from '../styles/globals';

export default
class ScrollKnob extends React.Component {

    constructor(props) {
        super(props);
        this.pitch = new Animated.Value(0);
        this.opacity = new Animated.Value(1);
        this.interval = null;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderStart: (e, gesture) => {
                Animated.spring(this.opacity, {toValue: 0}).start();
                this.onScrollEvent('Start', this.pitch._value);
                const onScrollStartDelayed = this.props.onScrollStartDelayed;
                if (onScrollStartDelayed) {
                    setTimeout(() => {
                        onScrollStartDelayed(this.pitch._value);
                    }, this.props.startDelay);
                }
                const onScrollInterval = this.props.onScrollInterval;
                if (onScrollInterval) {
                    this.interval = setInterval(() => {
                        onScrollInterval(this.pitch._value);
                    }, this.props.interval);
                }
            },
            onPanResponderMove: Animated.event([
                null,
                {dy: this.pitch}
            ], {
                listener: () => {
                    this.onScrollEvent('Move', this.pitch._value);
                }
            }),
            onPanResponderRelease: (e, gesture) => {
                clearInterval(this.interval);
                Animated.spring(this.pitch, {toValue: 0}).start();
                Animated.spring(this.opacity, {toValue: 1}).start();
                this.onScrollEvent('End');
            }
        });
    }

    render() {
        return (
            <View style={[styles.wrapper, this.props.style]}>
                <View style={styles.container}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[{top: this.pitch}, styles.knob]}
                    >
                        <Animated.View style={{opacity: this.opacity}}>
                            <Icon
                                style={[styles.icon]}
                                name="vertical-align-center"
                                size={KNOB_RADIUS * 1.5}
                                color={Colors.dark}
                            />
                        </Animated.View>
                    </Animated.View>
                </View>
            </View>
        );
    }

    onScrollEvent(event, arg) {
        event = 'onScroll'.concat(event);
        const handler = this.props[event];
        if (handler) handler(arg);
    }
}

ScrollKnob.propTypes = {
    style: PropTypes.any,
    onScrollStart: PropTypes.func,
    startDelay: PropTypes.number,
    onScrollStartDelayed: PropTypes.func,
    onScrollMove: PropTypes.func,
    interval: PropTypes.number,
    onScrollInterval: PropTypes.func,
    onScrollEnd: PropTypes.func,
};