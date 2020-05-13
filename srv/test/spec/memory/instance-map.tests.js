const map = require('../../../src/memory/instance-map');

describe('Instance map', () => {

    const
        mockId = 'mock_id',
        mockInstance = {socket: 'mock', code: '1234'};

    beforeAll(() => {
        // Init instance and test that instance map can count instances.
        const count = map.count();
        map.add(mockId, mockInstance);
        // Assert that map length increases by one when adding new instance.
        expect(map.count()).toBe(count + 1);
    });

    it('can add value by id', () => {
        const instance = map.read(mockId);
        expect(instance).toBe(mockInstance)
    });

    it('can find an instance by property value', () => {
        const instance = map.find('code', '1234');
        expect(instance).toBe(mockInstance);
    });

    it('returns null when unable to find instance by property value', () => {
        let Null = map.find('length', 4);
        expect(Null).toBe(null);
    });

    it('can clone inner map structure', () => {
        expect(map.clone()).toEqual(map.map);
    });

    afterAll(() => {
        // Remove instance
        const count = map.count();
        map.remove(mockId);
        // Assert that array length increases by one when removing instance.
        expect(map.count()).toBe(count - 1);
    });
});