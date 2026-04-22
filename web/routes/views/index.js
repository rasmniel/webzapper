const keystone = require('keystone');
const Features = keystone.list('Feature');
const Articles = keystone.list('Article');

exports = module.exports = (req, res) => {
    let locals = res.locals;
    locals.section = 'index';
    Features.model.find().sort('sortOrder').exec((error, features) => {
        if (error) console.warn('Error when getting features from database', error);
        else {
            locals.features = features;
            Articles.model.find().sort('-created').exec((error, articles) => {
                if (error) console.warn('Error when getting news from database', error);
                else {
                    locals.news = articles;
                    const view = new keystone.View(req, res);
                    view.render('index');
                }
            });
        }
    });
};
