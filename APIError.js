const util = require('util');

function APIError(message, statusCode, id) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorid = id;
    this.message = message;
    this.httpStatusCode = statusCode;
}

util.inherits(APIError, Error);

module.exports = APIError;
