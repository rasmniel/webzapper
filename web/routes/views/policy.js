const keystone = require('keystone');
const Policy = keystone.list('Policy');

exports = module.exports = function (req, res) {
    let locals = res.locals;
    locals.title += ': Policy';
    locals.section = 'policy';
    Policy.model.find().where('type', 'privacy').sort('sortOrder').exec((error, policies) => {
        if (error) console.warn('Error when getting features from database', error);
        else {
            locals.policies = policies;
            Policy.model.find().where('type', 'cookie').sort('sortOrder').exec((error, cookies) => {
                if (error) console.warn('Error when getting features from database', error);
                else {
                    locals.cookiePolicy = cookies[0];
                    const view = new keystone.View(req, res);
                    view.render('policy');
                }
            });
        }
    });
};
