const util = require('util');

function APIError(id, statusCode, message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorId = id;
    this.message = message;
    this.httpStatusCode = statusCode;
}

APIError.prototype.context = function(context) {
    this.errorContext = Object.assign({}, this.errorContext, context);
    return this;
}

util.inherits(APIError, Error);

module.exports = APIError;
