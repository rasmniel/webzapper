import * as Types from '../types/feedback-types';

const INITIAL_STATE = {
    alias: '',
    message: '',
    response: '',
    submitFeedbackLoading: false,
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {

        case Types.SET_FEEDBACK_ALIAS:
            return {...state, alias: payload};
        case Types.SET_FEEDBACK_MESSAGE:
            return {...state, message: payload};

        case Types.SUBMIT_FEEDBACK_START:
            return {...state, response: '', submitFeedbackLoading: true};
        case Types.SUBMIT_FEEDBACK_ERROR:
            return {...state, response: payload, submitFeedbackLoading: false};
        case Types.SUBMIT_FEEDBACK_SUCCESS:
            return {...state, response: payload, submitFeedbackLoading: false, alias: '', message: ''};

        case Types.RESET_FEEDBACK_RESPONSE:
            return {...state, response: ''};

        default:
            return state;
    }
};
