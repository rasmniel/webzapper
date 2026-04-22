const keystone = require('keystone');
const Types = keystone.Field.Types;

const Feature = new keystone.List('Feature', {
    map: {name: 'title'},
    defaultColumns: 'title, icon',
    sortable: true
});

Feature.add({
    title: {
        type: Types.Text,
        initial: true,
        required: true
    },
    content: {
        type: Types.Textarea,
        initial: true,
        required: true
    },
    icon: {
        type: Types.Text,
        initial: true,
        required: true
    }
});

Feature.register();
