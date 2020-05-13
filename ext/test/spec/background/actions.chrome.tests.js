import {messageActiveTab, navigateTab} from '../../../src/background/actions';

describe('Background actions test suite', () => {

    const mockTabs = [{
        id: 0,
        index: 0
    }, {
        id: 1,
        index: 1
    }, {
        id: 2,
        index: 2
    }];

    beforeAll(() => {
        // Mock chrome object.
        window.chrome = jest.fn();
        chrome.tabs = jest.fn();

        // Mock chrome.tabs.query to return array of mocked tabs.
        chrome.tabs.query = jest.fn((query, callback) => {
            // Tab index 0 is always active.
            if (query.active)
                callback([mockTabs[0]]);
            // If an index was queried, return tab with specified index.
            else if (typeof query.index === 'number')
                for (let tab of mockTabs)
                    if (tab.index === query.index)
                        callback([tab]);
        });

        // Mock function for getting all tabs.
        chrome.tabs.getAllInWindow = jest.fn((arg, callback) => {
            callback(mockTabs);
        });
    });

    test('can message active tab', () => {
        chrome.tabs.sendMessage = jest.fn();
        const mockMessage = 'mock message';
        messageActiveTab(mockMessage);
        expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(mockTabs[0].id, mockMessage);
    });

    const selected = {selected: true};
    test('can navigate tab', () => {
        chrome.tabs.update = jest.fn();
        navigateTab({payload: 1});
        expect(chrome.tabs.update).toHaveBeenCalledWith(mockTabs[1].index, selected)
    });

    test('can navigate tabs back', () => {
        chrome.tabs.update = jest.fn();
        navigateTab({payload: -1});
        expect(chrome.tabs.update).toHaveBeenCalledWith(mockTabs[2].index, selected)
    });

    test('can wrap tabs forward', () => {
        chrome.tabs.update = jest.fn();
        navigateTab({payload: 3});
        expect(chrome.tabs.update).toHaveBeenCalledWith(mockTabs[0].index, selected)
    });
});
