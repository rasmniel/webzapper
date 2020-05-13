import DeviceInfo from 'react-native-device-info';

import * as Types from '../types/feedback-types';
const url = 'http://localhost:3000';

export const postFeedback = (name, message) => {
    if (!name || !message) {
        return {
            type: Types.SUBMIT_FEEDBACK_ERROR,
            payload: 'Please include both a name and a message.'
        };
    }
    return (dispatch) => {
        dispatch({
            type: Types.SUBMIT_FEEDBACK_START
        });
        const feedback = {
            name: name,
            message: message,
            type: 'app'
        };
        // Post feedback.
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                // Substitute okhttp user agent for actual device ua.
                'User-agent': DeviceInfo.getUserAgent()
            }),
            body: JSON.stringify(feedback)
        }).then((response) => {
            if (response.ok) {
                dispatch({
                    type: Types.SUBMIT_FEEDBACK_SUCCESS,
                    payload: 'Thanks! Your feedback is appreciated! :-)'
                });
            } else {
                dispatch({
                    type: Types.SUBMIT_FEEDBACK_ERROR,
                    payload: 'Apologies, but something went wrong. Please try again later.'
                });
            }
        }).catch((error) => dispatch({
            type: Types.SUBMIT_FEEDBACK_ERROR,
            payload: 'Network error: are you connected to the internet?'
        }));
    };
};

export const setFeedbackAlias = (alias) => {
    return {
        type: Types.SET_FEEDBACK_ALIAS,
        payload: alias
    }
};

export const setFeedbackMessage = (message) => {
    return {
        type: Types.SET_FEEDBACK_MESSAGE,
        payload: message
    }
};

export const resetFeedbackResponse = () => {
    return {
        type: Types.RESET_FEEDBACK_RESPONSE,
    };
};