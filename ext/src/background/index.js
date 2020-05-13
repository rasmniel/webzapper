import Fingerprint from 'fingerprintjs2';
import Dispatch from './dispatch';
import Socket from './socket';
import {REQUEST_INPUTS} from '../types';

const host = 'http://localhost:3000';

// Generate unique fingerprint for server identification.
let fingerprint = '';
new Fingerprint().get((result, components) => {
    fingerprint = result;
});

window.getSocket = () => {
    // Expose socket to by assigning it to the window object.
    if (!window.socket)
        window.socket = new Socket(Dispatch, host, fingerprint);
    return window.socket;
};

// Dispatch all incoming messages as actions.
chrome.runtime.onMessage.addListener(Dispatch);

// On new tab activated, send input request.
chrome.tabs.onActivated.addListener((info) => {
    Dispatch({
        type: REQUEST_INPUTS
    });
});