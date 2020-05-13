import {StyleSheet} from 'react-native';
import {Colors, Constants} from './globals';

export const KNOB_RADIUS = 24;
export const BACKGROUND_RADIUS = 32;
export const ScrollKnobStyles = StyleSheet.create( {
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        overflow: 'hidden',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        overflow: 'hidden',
        width: BACKGROUND_RADIUS * 2,
        height: BACKGROUND_RADIUS * 2,
        borderRadius: Constants.DEFAULT_BORDER_RADIUS * 2,
        borderColor: Colors.dark,
        borderWidth: 1,
    },
    knob: {
        justifyContent: 'center',
        alignItems: 'center',
        width: KNOB_RADIUS * 2,
        height: KNOB_RADIUS * 2,
        borderRadius: KNOB_RADIUS,
        backgroundColor: Colors.smoke,
        borderColor: Colors.dark,
        borderWidth: 1,
    },
    icon: {
        backgroundColor: 'transparent',
    }
});
