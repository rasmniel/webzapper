const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

// Register common middleware
keystone.pre('routes', middleware.initLocals);

// Import route controllers
const routes = {
    views: importRoutes('./views'),
    post: importRoutes('./post')
};

// Setup route bindings
exports = module.exports = (app) => {
    // Get routes
    app.get('/', routes.views.index);
    app.get('/policy', routes.views.policy);
    app.get('/about', routes.views['about']);

    // Post routes
    app.post('/feedback', middleware.verifySource, routes.post.feedback);
};
