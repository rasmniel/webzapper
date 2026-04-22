const keystone = require('keystone');
const Types = keystone.Field.Types;

const SiteGlobals = new keystone.List('SiteGlobals', {
    map: {name: 'title'},
    defaultColumns: 'title',
    singular: 'SiteGlobals',
    plural: 'SiteGlobals'
});

SiteGlobals.add({
    title: {
        type: Types.Text,
        initial: true,
        required: true
    },
    appLink: {
        type: Types.Text,
        initial: true
    },
    extLink: {
        type: Types.Text,
        initial: true
    },
    masterLink: {
        type: Types.Text,
        initial: true
    },

    // Hack - should not be here:
    gettingStarted: {
        type: Types.Html,
        wysiwyg: true
    },
    about: {
        type: Types.Html,
        wysiwyg: true
    }
});

SiteGlobals.register();
