const keystone = require('keystone');
const Types = keystone.Field.Types;

const Policy = new keystone.List('Policy', {
    map: {name: 'title'},
    defaultColumns: 'title, type',
    defaultSort: 'title',
    sortable: true,
    singular: 'Policy',
    plural: 'Policies'
});

Policy.add({
    title: {
        type: Types.Text,
        initial: true,
        required: true
    },
    content: {
        type: Types.Html,
        wysiwyg: true,
        initial: true
    },
    type: {
        type: Types.Select,
        options: 'privacy, cookie',
        required: true,
        initial: true
    }
});

Policy.register();
