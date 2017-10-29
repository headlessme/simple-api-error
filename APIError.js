const util = require('util');

function APIError(message, statusCode) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.httpStatusCode = statusCode;
}

util.inherits(APIError, Error);

module.exports = APIError;
