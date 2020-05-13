/**
 * Created by rasmniel on 26/10/2017.
 */
// import Socket from '../src/reducer-actions/socket/socket-actions.js';
import * as Actions from '../src/reducer-actions/input/input-actions.js';

describe('Input actions test suite', () => {

    beforeAll(() => {
        window.socket = jest.fn();
        // Socket.emit = jest.fn(() => {
        //     console.log('test');
        // });
    });

    test('', () => {
        Actions.navigateTab('test');
    });
});