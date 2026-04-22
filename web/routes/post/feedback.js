const keystone = require('keystone');
const Feedback = keystone.list('Feedback');

exports = module.exports = (req, res) => {
    const body = req.body;
    const feedback = new Feedback.model(body);
    feedback.userAgent = req.headers['user-agent'];
    feedback.save((error) => {
        if (error) {
            if (error.name === 'ValidationError')
                res.sendStatus(400);
            else res.sendStatus(500);
            feedbackError(req, error);
        }
        else res.sendStatus(201);
    });
};

const feedbackError = (req, error) => {
    const data = req.body;
    const feedback = new Feedback.model();
    feedback.name = 'Feedback error!';
    feedback.message = JSON.stringify(data);
    feedback.userAgent = JSON.stringify(error);
    feedback.type = 'error';
    feedback.save((error) => {
        if (error)
            console.warn('Absolutely failed saving feedback error data.', data, error);
    });
};