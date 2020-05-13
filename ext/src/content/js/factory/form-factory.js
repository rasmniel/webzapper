import InputFactory from './input-factory';
import {Input, Form} from './elements';
import {DECLARE_FORMS} from '../../../types';

class FormFactory extends InputFactory {
    constructor() {
        super(DECLARE_FORMS);
    }

    find() {
        // Find all form elements and all input elements inside.
        const forms = [];
        for (let form of document.querySelectorAll('form')) {
            const inputs = [];

            // Create input data from input elements.
            for (let input of form.querySelectorAll('input')) {
                inputs.push(this.createInput(input));
            }
            // Create input data from button elements.
            for (let button of form.querySelectorAll('button')) {
                inputs.push(this.createButton(button, true));
            }
            // Create form data.
            forms.push(this.createForm(form, inputs));
        }
        return forms;
    }

    createForm(element, inputs) {
        return new Form(
            element.id,
            element.className,
            element.action,
            inputs
        );
    }

    createInput(element, button) {
        return new Input(
            element.id,
            element.className,
            element.type,
            element.value,
            element.placeholder,
            button
        );
    }

    createButton(element) {
        return this.createInput(element, true);
    }
}

export default (new FormFactory());