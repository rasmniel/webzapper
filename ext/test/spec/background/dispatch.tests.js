import Dispatch from '../../../src/background/dispatch';
import * as Types from '../../../src/types';

jest.mock('../../../src/background/actions', () => {
    return {
        navigateTab: jest.fn(),
        messageActiveTab: jest.fn(),
        emit: jest.fn()
    };
});

import * as Actions from '../../../src/background/actions';

const mockActions = [{
    method: 'navigateTab',
    types: [
        Types.NAVIGATE_TAB
    ]
}, {
    method: 'messageActiveTab',
    types: [
        Types.CONTROL_VIDEO,
        Types.REQUEST_INPUTS,
        Types.REQUEST_FORMS,
        Types.REQUEST_ANCHORS,
        Types.NAVIGATE_URL,
        Types.NAVIGATE_HISTORY,
        Types.CHANGE_INPUT,
        Types.SUBMIT_FORM,
        Types.CLICK_ELEMENT,
        Types.SMOOTH_SCROLL
    ]
}, {
    method: 'emit',
    types: [
        Types.DECLARE_FORMS,
        Types.DECLARE_ANCHORS,
        Types.DECLARE_VIDEOS
    ]
}];

import {assertWithDispatch} from '../tools.js';
const assertDispatch = assertWithDispatch(Dispatch);

describe('Background Dispatch test suite', () => {

    test('can dispatch all background actions', () => {
        for (let action of mockActions) {
            for (let type of action.types) {
                assertDispatch(type, Actions[action.method]);
            }
        }
    });

});