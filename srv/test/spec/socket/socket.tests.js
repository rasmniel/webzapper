const Socket = require('../../../src/socket/socket');
const Identity = require('../../../src/socket/identity');

describe('Abstract socket', () => {

    const
        mockIdentity = new Identity('mock_fingerprint', 'mock_ip', 'mock_userAgent'),
        mockType = 'mock_type',
        mockEmit = 'mock_emit',
        mockPayload = 'payload';

    const mockTypes = [mockType, mockEmit];

    let mockSocket, socket;

    beforeAll(() => {
        // Initialize mocked socket.
        mockSocket = {on: jest.fn(), emit: jest.fn()};
        // Create actual socket, using mocked socket as spy.
        socket = new Socket(mockIdentity, mockSocket, mockTypes);
        // Assert supplied types have been initialized by the socket along with a disconnect event.
        const expectedTypes = ['disconnect'].concat(mockTypes);
        for (let i = 0; i < expectedTypes.length; i++)
            expect(mockSocket.on.mock.calls[i])
                .toContain(expectedTypes[i]);
    });

    it('can emit from internal socket', () => {
        socket.emit(mockType, mockPayload);
        expect(mockSocket.emit.mock.calls[0]).toEqual([mockType, mockPayload]);
    });

    it('can invoke onType from on-handler', () => {
        const onType = socket.onType;
        socket.onType = jest.fn();
        socket.getTypeHandler()();
        expect(socket.onType).toHaveBeenCalled();
        socket.onType = onType;
    });

    it('throws when calling unimplemented onType', () => {
        expect(socket.onType).toThrow();
    });

    it('throws when calling unimplemented onDisconnect', () => {
        expect(socket.onDisconnect).toThrow();
    });

    it('can create an object representation of itself', () => {
        // TODO Should be an Identity feature. Refactor code and test Identity.
        expect(socket.toObject()).toEqual(mockIdentity);
    });
});