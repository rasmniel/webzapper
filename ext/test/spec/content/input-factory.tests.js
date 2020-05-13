import InputFactory from '../../../src/content/js/factory/input-factory';

const mockType = 'mock_type';
const mockPayload = ['video', 'form', 'anchor'];

describe('Content abstract InputFactory test suite', () => {

    test('cannot create abstract input factory class', () => {
        expect(() => {
            new InputFactory();
        }).toThrow();
    });

    test('cannot create a typeless input factory subclass', () => {
        expect(() => {
            new MockFactory();
        }).toThrow();
    });

    test('factory subclass must implement find function', () => {
        const factory = new MockTypeFactory();
        expect(() => {
            factory.find();
        }).toThrow();
    });

    test('factory can declare arbitrary message', () => {
        window.chrome = jest.fn();
        chrome.runtime = jest.fn();
        chrome.runtime.sendMessage = jest.fn();
        const expectedResult = {
            type: mockType,
            payload: mockPayload
        };
        const factory = new MockImplFactory();
        factory.declare();
        expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(expectedResult);
    });
});

// Mock classes
class MockFactory extends InputFactory {
}

class MockTypeFactory extends InputFactory {
    constructor() {
        super(mockType);
    }
}

class MockImplFactory extends MockTypeFactory {
    find() {
        return mockPayload;
    }
}