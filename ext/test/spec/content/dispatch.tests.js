import Dispatch from '../../../src/content/js/dispatch';
import * as Types from '../../../src/types';

jest.mock('../../../src/content/actions', () => {
    return {
        navigateUrl: jest.fn(),
        navigateHistory: jest.fn(),
        changeInput: jest.fn(),
        controlVideo: jest.fn(),
        submitForm: jest.fn(),
        clickElement: jest.fn(),
        smoothScroll: jest.fn(),
    };
});

// AnchorFactory mock
jest.mock('../../../src/content/factory/anchor-factory', () => {
    return {
        declare: jest.fn(),
    };
});

// FormFactory mock
jest.mock('../../../src/content/factory/form-factory', () => {
    return {
        declare: jest.fn(),
    };
});

// VideoFactory mock
jest.mock('../../../src/content/factory/video-factory', () => {
    return {
        declare: jest.fn(),
    };
});

import * as Actions from '../../../src/content/js/actions';
import * as AnchorFactory from '../../../src/content/js/factory/anchor-factory';
import * as FormFactory from '../../../src/content/js/factory/form-factory';
import * as VideoFactory from '../../../src/content/js/factory/video-factory';

const mockActions = [
    {type: Types.NAVIGATE_URL, method: 'navigateUrl'},
    {type: Types.NAVIGATE_HISTORY, method: 'navigateHistory'},
    {type: Types.CHANGE_INPUT, method: 'changeInput'},
    {type: Types.CONTROL_VIDEO, method: 'controlVideo'},
    {type: Types.SUBMIT_FORM, method: 'submitForm'},
    {type: Types.CLICK_ELEMENT, method: 'clickElement'},
    {type: Types.SMOOTH_SCROLL, method: 'smoothScroll'}
];

const mockFactories = [
    {type: Types.REQUEST_ANCHORS, declare: AnchorFactory.declare},
    {type: Types.REQUEST_FORMS, declare: FormFactory.declare},
    {type: Types.REQUEST_VIDEOS, declare: VideoFactory.declare}
];

import {assertWithDispatch} from '../tools.js';
const assertDispatch = assertWithDispatch(Dispatch, true);

describe('Content Dispatch test suite', () => {

    test('can dispatch content actions', () => {
        for (let action of mockActions) {
            assertDispatch(action.type, Actions[action.method]);
        }
    });

    test('can dispatch content declarations', () => {
        for (let factory of mockFactories) {
            assertDispatch(factory.type, factory.declare);
        }
    });

    test('can dispatch declaration for multiple inputs', () => {
        const mockPayload = 'mock';
        Dispatch({
            type: Types.REQUEST_INPUTS,
            payload: mockPayload
        });
        // Assert video declaration and clear mock.
        expect(VideoFactory.declare).toHaveBeenCalledTimes(1);
        expect(VideoFactory.declare).toHaveBeenCalledWith(mockPayload);
        VideoFactory.declare.mockClear();
        // Assert form declaration and clear mock.
        expect(FormFactory.declare).toHaveBeenCalledTimes(1);
        expect(FormFactory.declare).toHaveBeenCalledWith(mockPayload);
        FormFactory.declare.mockClear();
    });

});
