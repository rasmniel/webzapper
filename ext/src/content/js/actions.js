// Dispatch can also be used locally by passing it an object with a type property.
import {REQUEST_INPUTS, MASTER_CHECK} from '../../types';

// TODO Move to events.js
export const declare = (dispatch) => {
    // Ask background script whether there's a master to send inputs to before declaring.
    chrome.runtime.sendMessage({type: MASTER_CHECK}, (response) => {
        if (!response) return;
        // After the page loads, declare inputs.
        document.addEventListener('DOMContentLoaded', () => {
            const declareCount = 2;
            let i = 0;
            // Keep sending video and form requests every second.
            const declarationInterval = setInterval(() => {
                if (i++ === declareCount)
                    clearInterval(declarationInterval);
                dispatch({
                    type: REQUEST_INPUTS
                });
            }, 1000);
        });
    });
};

// Navigation, input and interaction.
export const navigateUrl = (url) => {
    window.location.href = url;
};

export const navigateHistory = (method) => {
    window.history[method]();
};

export const changeInput = (inputChange) => {
    const {selector, value} = inputChange;
    document.querySelector(selector).value = value;
};

export const clickElement = (selector) => {
    document.querySelector(selector).click();
};

export const submitForm = (selector) => {
    const form = document.querySelector(selector);
    const submit = form.submit();
    if (!submit) {
        // Submit handler does not run when calling submit() from code.
        // Dispatch submit event to force submit handler to run.
        // const event = new Event('submit');
        // form.dispatchEvent(event);
    }
};

// Video controls
export const controlVideo = (control) => {
    const video = document.querySelector(control.selector);
    switch (control.action) {

        // Control video time.
        case 'time':
            setVideoTime(video, control.time);
            break;

        // Control video playback state.
        case 'toggle':
            togglePlayback(video);
            break;

        // Toggle fullscreen.
        case 'fullscreen':
            toggleFullscreen(video);
            break;

        default:
            throw new Error('Trying to control video with invalid action.', control);
    }
};

export const setVideoTime = (video, time) => {
    video.currentTime = video.duration * time;
};

export const togglePlayback = (video) => {
    if (video.paused || video.ended || video.currentTime === 0)
        video.play();
    else
        video.pause();
};

let originalState = null;
export const toggleFullscreen = (video) => {
    if (!originalState) {
        originalState = new VideoState(false, video.parentElement, video.style.width, video.style.height);
        const newState = new VideoState(true, document.body, '100%', '100%');
        setVideoState(video, newState);
    }
    else {
        setVideoState(video, originalState);
        originalState = null;
    }
};

export const setVideoState = (video, state) => {
    state.parent.appendChild(video);
    video.style.width = state.width;
    video.style.height = state.height;
    const f = state.fullscreen;
    video.style.backgroundColor = f ? 'black' : 'transparent';
    for (let element of document.querySelectorAll('body *:not(video)')) {
        element.style.opacity = f ? '0' : '1';
    }
};

export function VideoState(fullscreen, parent, width, height) {
    this.fullscreen = fullscreen;
    this.parent = parent;
    this.width = width;
    this.height = height;
}

// Scrolling
export const smoothScroll = (speed) => {
    if (!speed) endScroll();
    else doScroll(speed);
};

const
    Interval = 10,
    IncrementDampener = 0.025;
let
    scrollInterval = null,
    scrollSpeed = 0,
    scrollSpeedLimit = 0;
export const doScroll = (speed) => {
    scrollSpeedLimit = speed;
    if (scrollInterval) return;
    // Set scroll interval, listening for and adjusting to speed changes.
    scrollInterval = setInterval(() => {
        // if limit is positive and speed is lower than limit...
        if (scrollSpeedLimit > 0 && scrollSpeed < scrollSpeedLimit ||
            // ... or if limit is negative and speed is higher than limit,
            scrollSpeedLimit < 0 && scrollSpeed > scrollSpeedLimit) {
            // increment speed by a fraction of the speed limit to smooth the scrolling experience.
            scrollSpeed += scrollSpeedLimit * IncrementDampener;
        }
        window.scrollTo(0, window.pageYOffset + scrollSpeed);
    }, Interval);
};

export const endScroll = () => {
    scrollSpeed = scrollSpeedLimit = 0;
    clearInterval(scrollInterval);
    scrollInterval = null;
};