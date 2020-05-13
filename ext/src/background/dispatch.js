import * as Actions from './actions';
import * as Types from '../types';

// Dispatch listening on messages from content script.
export default function Dispatch(action, sender, respond) {
    switch (action.type) {

        // Background script actions.
        case Types.NAVIGATE_TAB:
            Actions.navigateTab(action);
            break;

        // Actions from server to forward to content script.
        case Types.CONTROL_VIDEO:
        case Types.REQUEST_INPUTS:
        case Types.REQUEST_FORMS:
        case Types.REQUEST_ANCHORS:
        case Types.NAVIGATE_URL:
        case Types.NAVIGATE_HISTORY:
        case Types.CHANGE_INPUT:
        case Types.SUBMIT_FORM:
        case Types.CLICK_ELEMENT:
        case Types.SMOOTH_SCROLL:
            Actions.messageActiveTab(action);
            break;

        // Actions from content script to emit to server.
        case Types.DECLARE_FORMS:
        case Types.DECLARE_ANCHORS:
        case Types.DECLARE_VIDEOS:
            Actions.emit(action);
            break;

        // Content script asking whether there's a master.
        case Types.MASTER_CHECK:
            Actions.masterCheck(respond);
            break;
    }
}
