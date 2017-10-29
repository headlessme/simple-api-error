const util = require('util');
const APIError = require('./APIError');

const options = {
    log: function(status, req, err) {
        if (status === 500) {
            console.error(req.method, req.url, status, err.message, err.stack);
        } else {
            console.warn(req.method, req.url, status, err.message);
        }
    }
};

// 404 handler
module.exports.notFound = function(req, res, next){
    return next(new APIError('not found', 404));
};

// other errors
module.exports.error = function(err, req, res, next){
    let status = 500;
    if (err && (err instanceof APIError) && err.httpStatusCode)
        status = err.httpStatusCode || 500;

    res.status(status).send({
        error: true,
        statusCode: status,
        message: err.message,
        url: req.originalUrl
    });

    options.log(status, req, err);
};

module.exports.options = options;
module.exports.APIError = APIError;
