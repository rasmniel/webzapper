import {StyleSheet} from 'react-native';
import {Colors, Constants} from './globals';

export const InputListStyles = StyleSheet.create({
    // Top level
    wrapper: {
        borderTopWidth: 1,
        borderColor: Colors.dark,
        backgroundColor: Colors.smoke,
    },
    inputList: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    // Section
    sectionHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: Colors.dark,
        backgroundColor: Colors.smoke,
    },
    sectionBorder: {
        borderTopWidth: 1,
        borderColor: Colors.dark,
    },
    closedSection: {
        borderBottomColor: 'transparent',
    },
    sectionIcon: {
        flex: 1,
    },
    sectionTitle: {
        flex: 2,
        fontSize: 20,
        alignSelf: 'center',
    },
    sectionToggleWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    sectionToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    sectionFooter: {
        height: 12,
        backgroundColor: Colors.white,
    },

    // Generic list item
    listItem: {
        flex: 1,
        padding: Constants.DEFAULT_PADDING / 2,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderColor: Colors.gray,
    },
    itemTitle: {
        fontSize: 16,
    },
    itemNote: {
        fontSize: 9,
        fontFamily: 'monospace',
    },

    // Anchors
    anchorItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    anchorSearch: {
        flex: 3,
        height: 36,
    },

    // Videos.
    videoControlBar: {
        flexDirection: 'row',
        marginTop: 10,
        height: Constants.DEFAULT_COMPONENT_SIZE,
    },
    slider: {
        flex: 1,
    },
    videoControl: {
        marginLeft: 20,
        marginRight: 10,
        height: Constants.DEFAULT_COMPONENT_SIZE,
        width: Constants.DEFAULT_COMPONENT_SIZE,
        borderRadius: Constants.DEFAULT_BORDER_RADIUS,
    },
    togglePlaybackButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    // Forms
    formInput: {
        marginVertical: 10,
    },
    textInput: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.dark,
        borderRadius: Constants.DEFAULT_BORDER_RADIUS
    },
    formSubmitWrapper: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    submitText: {
        alignSelf: 'flex-end',
        fontSize: 24,
    },
    submitButton: {
        marginLeft: 20,
        marginRight: 10,
        backgroundColor: Colors.smoke,
        width: Constants.DEFAULT_COMPONENT_SIZE,
        height: Constants.DEFAULT_COMPONENT_SIZE,
        borderRadius: Constants.DEFAULT_BORDER_RADIUS,
        borderColor: Colors.dark,
        borderWidth: 1,
    },
});
