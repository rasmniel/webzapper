export const masterCheck = (respond) => {
    const hasMaster = window.socket && window.socket.slaveHasMaster;
    respond(hasMaster);
};

export const messageActiveTab = (message) => {
    // Intercept video fullscreen actions.
    if (message.payload && message.payload.action === 'fullscreen')
        toggleFullscreen();
    // Send message to the currently active tab.
    activeTab((tab) => {
        chrome.tabs.sendMessage(tab.id, message);
    });
};

export const navigateTab = (message) => {
    const delta = message.payload;
    activeTab((tab) => {
        chrome.tabs.getAllInWindow(null, (allTabs) => {
            let index = tab.index + delta;
            // Wrap tabs.
            const n = allTabs.length - 1;
            index = index < 0 ? n : (index > n ? 0 : index);
            chrome.tabs.query({index: index}, (result) => {
                chrome.tabs.update(result[0].id, {selected: true});
            });
        });
    });
};

export const activeTab = (callback) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0])
            callback(tabs[0]);
    });
};

export const toggleFullscreen = () => {
    chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, (w) => {
        // Toggle the window state between fullscreen and maximized.
        let newState = w.state === 'fullscreen' ? 'maximized' : 'fullscreen';
        chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {state: newState});
    });
};

export const emit = (action) => {
    if (window.socket)
        window.socket.emit(action);
};