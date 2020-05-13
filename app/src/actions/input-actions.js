import * as Input from '../types/input-types';
import {emit} from '../actions/socket-actions';
const NO_OP = {type: Input.NO_OP};

export const setUrl = (url) => {
    return {
        type: Input.SET_URL,
        payload: url
    };
};

export const navigateUrl = (url) => {
    if (url) {
        // Prepend missing http.
        if (!url.match('http'))
            url = 'http://'.concat(url);
        emit('navigate_url', url);
        return {
            type: Input.SET_URL,
            payload: url
        };
    }
    else {
        return NO_OP;
    }
};

export const navigateTab = (delta) => {
    emit('navigate_tab', delta);
    return NO_OP;
};

export const navigateHistory = (method) => {
    emit('navigate_history', method);
    return NO_OP;
};

export const toggleVideoPlayback = (selector) => {
    emit('control_video', {
        selector: selector,
        action: 'toggle',
    });
    return NO_OP;
};

export const setVideoTime = (selector, time) => {
    emit('control_video', {
        selector: selector,
        action: 'time',
        time: time
    });
    return NO_OP;
};

export const toggleFullscreen = (selector) => {
    emit('control_video', {
        selector: selector,
        action: 'fullscreen'
    });
    return NO_OP;
};

export const inputChanged = (selector, value) => {
    inputChange = {
        selector: selector,
        value: value
    };
    emit('change_input', inputChange);
    return NO_OP;
};

export const submitForm = (form, submitSelector) => {
    if (!form.action || isJavascriptAction(form.action))
        emit('click_element', submitSelector);
    else
        emit('submit_form', form.selector);

    return NO_OP;
};

export const navigateAnchor = (anchor, selector) => {
    if (!anchor.href || isJavascriptAction(anchor.href))
        emit('click_element', selector);
    else
        emit('navigate_url', anchor.href);

    return NO_OP;
};

export const anchorSearch = (page, search) => {
    if (search) {
        const query = {
            page: page,
            search: search
        };
        emit('request_anchors', query)
    }
    return NO_OP;
};

const isJavascriptAction = (action) => {
    return action.match('javascript:');
};

const
    MinSpeedDelta = .75,
    PositiveInputDampener = 25,
    NegativeInputDampener = 10;
let currentSpeed = 0;
export const smoothScroll = (speed) => {
    // Make sure 0 speed isn't emitted as scroll speed. 0 is reserved for ending scroll.
    if (speed && speed !== 0) {
        if (speed > 0)
        // Dampen the input value based on the direction of scroll.
            speed /= PositiveInputDampener;
        else
        // Dampen negative less, since there's shorter leeway to the top of the screen.
            speed /= NegativeInputDampener;

        // Determine the speed delta relative to the current speed.
        speedDelta = Math.abs(speed) - Math.abs(currentSpeed);
        // Do not query server unless significant change in speed was observed.
        if (currentSpeed === 0 || speedDelta > MinSpeedDelta) {
            currentSpeed = speed;
            emit('smooth_scroll', speed);
        }
    }
    return NO_OP;
};

export const endScroll = () => {
    emit('smooth_scroll', 0);
    currentSpeed = 0;
    return NO_OP;
};