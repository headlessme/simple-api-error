const util = require('util');
const APIError = require('./APIError');

const options = {
    log: function(status, req, err) {
        const context = err.errorContext ? util.inspect(err.errorContext, {breakLength:Infinity}) : undefined;
        if (status === 500) {
            console.error(req.method, options.sanitize(req.url), status, err.message, err.stack, context || '');
        } else {
            console.warn(req.method, options.sanitize(req.url), status, err.message, context || '');
        }
    },
    sanitize: function(str) {
        return str
            .replaceAll(/token=[^\s&]*/gi, 'token=<redacted>')
    }
};

// 404 handler
module.exports.notFound = function(req, res, next){
    return next(new APIError('not found', 404, 'not_found'));
};

// other errors
module.exports.error = function(err, req, res, next){
    let status = 500;
    if (err && (err instanceof APIError) && err.httpStatusCode)
        status = err.httpStatusCode || 500;

    res.status(status).send({
        type: 'Error',
        statusCode: status,
        message: err.message,
        id: err.errorId,
        url: req.originalUrl,
        context: err.errorContext
    });

    options.log(status, req, err);
};

module.exports.options = options;
module.exports.APIError = APIError;
