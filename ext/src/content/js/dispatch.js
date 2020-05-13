import ElementFactory from './factory/element-factory';
import * as Actions from './actions';
import * as Types from '../../types';


export default function Dispatch({type, payload}) {
    switch (type) {

        // Declaration requests
        case Types.REQUEST_INPUTS:
            ElementFactory.declareVideos(payload);
            ElementFactory.declareForms(payload);
            break;

        case Types.REQUEST_FORMS:
            ElementFactory.declareForms(payload);
            break;

        case Types.REQUEST_ANCHORS:
            ElementFactory.declareAnchors(payload);
            break;

        case Types.REQUEST_VIDEOS:
            ElementFactory.declareVideos(payload);
            break;


        // Action requests
        case Types.NAVIGATE_URL:
            Actions.navigateUrl(payload);
            break;

        case Types.NAVIGATE_HISTORY:
            Actions.navigateHistory(payload);
            break;

        case Types.CHANGE_INPUT:
            Actions.changeInput(payload);
            break;

        case Types.CONTROL_VIDEO:
            Actions.controlVideo(payload);
            break;

        case Types.SUBMIT_FORM:
            Actions.submitForm(payload);
            break;

        case Types.CLICK_ELEMENT:
            Actions.clickElement(payload);
            break;

        case Types.SMOOTH_SCROLL:
            Actions.smoothScroll(payload);
            break;
    }
}