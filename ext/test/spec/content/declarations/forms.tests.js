import {initBody} from '../../tools';
import FormFactory from '../../../../src/content/js/factory/form-factory';

describe('Content form declarations test suite', () => {

    let formCount;

    beforeAll(async () => {
        // Initialize document body.
        document.body.innerHTML = await initBody(async (mock) => {
            return [
                await mock.read('simple-form'),
                await mock.read('advanced-form')
            ];
        });
        formCount = document.body.querySelectorAll('form').length;
    });

    test('can find form', () => {
        const forms = FormFactory.find();
        expect(forms.length).toBe(formCount);
    });

    test('can acquire all supported form inputs', () => {
        const checkAttributes = ['type', 'value', 'placeholder'];
        const expectedForms = FormFactory.find();
        const actualForms = document.querySelectorAll('form');
        // Can find all exposed forms.
        expect(expectedForms.length).toBe(actualForms.length);

        for (let i = 0; i < expectedForms.length; i++) {
            const expectedInputs = expectedForms[i].inputs;
            const actualInputs = actualForms[i].querySelectorAll('input, button');
            // Can find all inputs inside all forms and picks up no extra clutter.
            expect(expectedInputs.length).toBe(actualInputs.length);

            for (let j = 0; j < expectedInputs.length; j++) {
                const expectedInput = expectedInputs[i];
                const actualInput = actualInputs[i];
                for (let attribute of checkAttributes) {
                    // Ensure all inputs have the correct attributes.
                    expect(expectedInput[attribute]).toBe(actualInput[attribute]);
                }
            }
        }
    });
});