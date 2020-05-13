import {StyleSheet} from 'react-native';
import {Colors, Constants} from './globals';

export const FeedbackFormStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: Constants.DEFAULT_PADDING
    },
    header: {
        fontSize: 28,
        marginBottom: 12,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: Colors.dark,
        borderRadius: Constants.DEFAULT_BORDER_RADIUS,
    },
    nameWrapper: {
        height: 50,
        marginBottom: 12
    },
    messageWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginBottom: 12
    },
    feedbackField: {
        borderRadius: Constants.DEFAULT_BORDER_RADIUS,
        padding: 7,
    },
    spinner: {
        alignSelf: 'flex-start',
    },
    submit: {
        maxWidth: 200,
        alignSelf: 'flex-end',
    },
    submitWrapper: {
        flexDirection: 'row'
    },
    submitText: {
        fontSize: 30,
    },
    submitIcon: {
        marginLeft: 12,
        position: 'relative',
        top: 6
    },
    responseText: {
        fontSize: 24
    }
});

