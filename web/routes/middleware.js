const keystone = require('keystone');
const SiteGlobal = keystone.list('SiteGlobals');

// Init general locals.
exports.initLocals = function (req, res, next) {
    res.locals.title = res.locals.brand = 'Webzapper';
    if (req.method === 'GET') {
        res.locals.user = req.user;
        res.locals.navigation = [
            {label: 'Policy', key: 'policy', href: '/policy'},
            {label: 'About', key: 'about', href: '/about'},
        ];
        SiteGlobal.model.find().exec((error, siteGlobals) => {
            if (error) {
                console.warn('Could not find SiteGlobal ', error);
                res.sendStatus(500);
            }
            else {
                res.locals.siteGlobals = siteGlobals[0];
                next();
            }
        });
    } else next();
};

// Verify an arbitrary "source=crc" query on all post requests.
exports.verifySource = function (req, res, next) {
    if (req.method === 'POST') {
        if (req.query.source === 'zap') {
            next();
        }
        else res.sendStatus(403);
    }
};

// Prevents people from accessing protected pages when they're not signed in
exports.requireUser = function (req, res, next) {
    if (!req.user) {
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};
