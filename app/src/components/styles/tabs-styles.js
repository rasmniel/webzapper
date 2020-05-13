import {StyleSheet} from 'react-native';
import {Colors, Constants} from './globals';

export const TabsStyles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        paddingTop: 10,
        paddingHorizontal: Constants.DEFAULT_PADDING,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // Background acts as a fake border.
        backgroundColor: Colors.dark,
    },
    background: {
        position: 'absolute',
        backgroundColor: Colors.gray,
        top: 0,
        left: 0,
        right: 0,
        // Make space for the fake border to shine through.
        bottom: 1,
    },
    childWrapper: {
        flex: 1
    }
});