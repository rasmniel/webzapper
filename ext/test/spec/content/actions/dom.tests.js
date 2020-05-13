import {submitForm, changeInput, clickElement} from '../../../../src/content/js/actions';
import {initBody} from '../../tools';

describe('Content DOM actions test suite', () => {

    beforeAll(async () => {
        // Initialize document body.
        document.body.innerHTML = await initBody(async (mock) => {
            return [
                await mock.read('simple-form'),
                await mock.read('button'),
            ];
        });
    });

    test('can submit form', () => {
        const formSelector = '.simple-mock-form';
        const submit = jest.fn();
        document.querySelector(formSelector).submit = submit;
        submitForm(formSelector);
        expect(submit).toHaveBeenCalled();
    });

    test('can click element', () => {
        const buttonSelector = '.mock-button';
        const click = jest.fn();
        document.querySelector(buttonSelector).addEventListener('click', click);
        clickElement(buttonSelector);
        expect(click).toHaveBeenCalled();
    });

    test('can change input', () => {
        const inputSelector = '.mock-text-input';
        const input = document.querySelector(inputSelector);
        const mockValue = 'mocked';
        changeInput({
            selector: inputSelector,
            value: mockValue
        });
        expect(input.value).toBe(mockValue);
    });
});