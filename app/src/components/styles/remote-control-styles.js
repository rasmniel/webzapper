import {StyleSheet} from 'react-native';
import {Colors, Constants} from './globals';

export const RemoteControlStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.smoke,
    },
    inputWrapper: {
        padding: Constants.DEFAULT_PADDING,
    },
    touchWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Constants.DEFAULT_PADDING,
        paddingTop: Constants.DEFAULT_PADDING,
        flexDirection: 'row',
    },
    historyNavigation: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Constants.DEFAULT_COMPONENT_SIZE,
        width: Constants.DEFAULT_COMPONENT_SIZE,
        padding: 4,
        borderRadius: Constants.DEFAULT_COMPONENT_SIZE,
    },
    inputList: {
        flex: 1,
    },
    modal: {
        flex: 1,
    },
    footer: {
        borderTopWidth: 1,
        borderColor: Colors.dark,
        backgroundColor: Colors.gray,
        height: 51,
    },
    navigation: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Constants.DEFAULT_PADDING,
        height: 50,
    }
});
