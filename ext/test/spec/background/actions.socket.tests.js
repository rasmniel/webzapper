// import {declare} from '../../../src/background/actions';
// TODO Test socket...
describe('Background actions test suite', () => {

    const mockAction = {
        type: 'mock',
        payload: 'mock data'
    };

    beforeAll(() => {
        // Mock socket.
        window.socket = jest.fn();
    });

    // TODO Rewrite socket tests.
    test('can declare input elements', () => {
        socket.emit = jest.fn();
        socket.connected = true;
        // declare(mockAction);
        // expect(socket.emit).toHaveBeenCalledWith(mockAction.type, mockAction.payload);
    });

    test('will declare nothing if socket is disconnected', () => {
        socket.emit = jest.fn();
        socket.connected = false;
        // declare(mockAction);
        // expect(socket.emit).not.toHaveBeenCalled();
    });
});