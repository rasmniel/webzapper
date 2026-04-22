const keystone = require('keystone');
const Types = keystone.Field.Types;

const Feedback = new keystone.List('Feedback', {
    map: {name: 'name'},
    defaultColumns: 'created, name, message, type',
    defaultSort: '-created',
    plural: 'Feedback',
    nocreate: true,
    noedit: true
});

Feedback.add({
    name: {
        type: Types.Text,
        initial: true,
        required: true,
        index: true
    },
    message: {
        type: Types.Textarea,
        initial: true,
        required: true
    },
    userAgent: {
        type: Types.Textarea
    },
    type: {
        type: Types.Select,
        options: ['app', 'ext', 'error'],
        initial: true,
        required: true,
    },
    created: {
        type: Types.Datetime,
        default: Date.now,
        required: true
    }
});

Feedback.register();
