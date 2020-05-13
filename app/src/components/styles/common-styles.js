import {StyleSheet} from 'react-native';
import {Colors, Constants} from './globals';

export const ComponentStyles = StyleSheet.create({
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export const TabStyles = StyleSheet.create({
    tab: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 1,
        width: 120,
        borderBottomColor: Colors.smoke,
        backgroundColor: 'transparent',
    },
    tabBorder: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 122,
        borderBottomColor: Colors.dark,
    },
    trapezoid: {
        height: 0,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 42,
        borderLeftWidth: 23,
        borderRightWidth: 23,
    }
});

export const ActionFieldStyles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.dark,
        borderRadius: Constants.DEFAULT_BORDER_RADIUS,
        marginVertical: 2,
    },
    urlInput: {
        alignSelf: 'center',
        borderTopLeftRadius: Constants.DEFAULT_BORDER_RADIUS,
        borderBottomLeftRadius: Constants.DEFAULT_BORDER_RADIUS,
        padding: 7,
    },
    action: {
        borderTopRightRadius: Constants.DEFAULT_BORDER_RADIUS,
        borderBottomRightRadius: Constants.DEFAULT_BORDER_RADIUS,
        padding: 10,
    },
});

export const MessageStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    header: {
        fontSize: 24
    },
    text: {
        fontSize: 16,
        maxWidth: 300,
        textAlign: 'center',
    },
    link: {
        fontSize: 12,
        marginTop: 10,
    }
});

export const TextFieldStyles = StyleSheet.create({
    input: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});

export const IconStyles = StyleSheet.create({
    icon: {
        backgroundColor: 'transparent',
    }
});