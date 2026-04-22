const keystone = require('keystone');
const Types = keystone.Field.Types;

const Article = new keystone.List('Article', {
    map: {name: 'title'},
    defaultColumns: 'title, created',
    defaultSort: '-created',
    singular: 'Article',
    plural: 'Articles'
});

Article.add({
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
    created: {
        type: Types.Datetime,
        default: Date.now,
        noedit: true
    }
});


Article.schema.methods.getFormattedDate = function () {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const suffixes = ['st', 'nd', 'rd'];
    const date = this.created;
    const day = date.getDate();
    const suffix = suffixes[day] || 'th';
    const month = months[date.getMonth()];
    const year = date.getYear() + 1900;
    return `${month} ${day}${suffix}, ${year}`;
};

Article.register();
