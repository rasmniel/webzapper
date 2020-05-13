import ElementFactory from '../../../src/content/js/factory/elements';

describe('Content ElementFactory test suite', () => {

    const mockElement = {
        selector: '#mock-id.mock-class',
        id: 'mock-id',
        className: 'mock-class',
        type: 'mock',
        value: 'mocked',
        href: 'http://mock.com',
        action: 'mock/action/',
        textContent: 'mock text content',
        placeholder: 'Mock Placeholder',
        src: 'http://mock.com/?q=id'
    };

    const anchorsWithoutText = [{
        textContent: '',
    }, {
        textContent: '\t\t\t\t\t'
    }, {
        textContent: '\n\n\n\n\n'
    }, {
        textContent: '          '
    }];

    test('factory exists', () => {
        expect(ElementFactory).toBeDefined();
    });

    test('factory can create anchor', () => {
        const expectedAnchor = {
            selector: 'a' + mockElement.selector,
            textContent: mockElement.textContent,
            href: mockElement.href
        };
        const actualAnchor = ElementFactory.createAnchor(mockElement);
        expect(actualAnchor).toEqual(expectedAnchor);
    });

    test('factory can filter anchors without text content', () => {
        for (let invalid of anchorsWithoutText) {
            const anchorResult = ElementFactory.createAnchor(invalid);
            expect(anchorResult).not.toBeDefined();
        }
    });

    test('factory can create input', () => {
        const expectedInput = {
            selector: 'input' + mockElement.selector,
            type: mockElement.type,
            value: mockElement.value,
            placeholder: mockElement.placeholder
        };
        const actualInput = ElementFactory.createInput(mockElement);
        expect(actualInput).toEqual(expectedInput);
    });

    test('factory can create form', () => {
        const mockInputs = [ElementFactory.createInput(mockElement)];
        const expectedForm = {
            selector: 'form' + mockElement.selector,
            action: mockElement.action,
            inputs: mockInputs
        };
        const actualForm = ElementFactory.createForm(mockElement, mockInputs);
        expect(actualForm).toEqual(expectedForm);
    });

    test('factory can create video', () => {
        const expectedVideo = {
            selector: 'video' + mockElement.selector
        };
        const actualVideo = ElementFactory.createVideo(mockElement);
        expect(actualVideo).toEqual(expectedVideo);
    })
});
