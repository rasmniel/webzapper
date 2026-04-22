require('dotenv').config();
const keystone = require('keystone');

const buttonSections = [
    'bold italic underline strikethrough',
    'alignleft aligncenter alignright alignjustify',
    'numlist bullist',
    'formatselect removeformat',
    'link',
    'code'
];

keystone.init({
    'name': 'Webzapper',
    'brand': 'Webzapper',

    'sass': 'public',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'pug',

    'wysiwyg override toolbar': true,
    'wysiwyg additional buttons': buttonSections.join(' | '),
    'wysiwyg menubar': false,

    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'User',
});

keystone.import('models');

keystone.set('locals', {
    env: keystone.get('env'),
    editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

// Configure admin navigation
keystone.set('nav', {
    users: 'users',
    content: ['features', 'articles', 'policies'],
    feedback: 'feedbacks',
    config: 'site-globals',
});

// Start Keystone to connect to the database and initialise the web server
keystone.start();
