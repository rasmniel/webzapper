export class Element {
    constructor(tag, id, className) {
        this.initSelector(tag, id, className);
    }

    initSelector(tag, id, className) {
        let selector = tag;
        if (id)
            selector += '#' + id;
        if (className)
            selector += '.' + className.split(' ').join('.');
        this.selector = selector;
    }
}

export class Form extends Element {
    constructor(id, className, action, inputs) {
        super('form', id, className);
        this.action = action;
        this.inputs = inputs;
    }
}

export class Input extends Element {
    constructor(id, className, type, value, placeholder, button) {
        const tag = button ? 'button' : 'input';
        super(tag, id, className);
        this.type = type;
        this.value = value;
        this.placeholder = placeholder;
    }
}

export class Anchor extends Element {
    constructor(id, className, href, textContent) {
        super('a', id, className);
        this.href = href;
        this.textContent = textContent;
    }
}

export class Video extends Element {
    constructor(id, className) {
        super('video', id, className);
    }
}