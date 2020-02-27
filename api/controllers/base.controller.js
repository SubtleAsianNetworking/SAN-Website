const Joi = require('@hapi/joi');

class ResponseData {
    constructor(res, success = true, status_code = 200) {
        // Save response reference
        this.res = res;

        // Initiate payload object
        this.payload = { success, code: status_code };
    }

    json(data = null) {
        // Assign data
        this.payload.data = data;

        // Send response
        this.res.status(this.payload.code).json(this.payload);
    }

    send() {
        this.json();
    }

    status(status_code) {
        this.payload.code = status_code;
        return this;
    }

    message(message) {
        this.payload.message = message;
        return this;
    }
}

class BaseController {
    success(res, status_code=200) {
        return new ResponseData(res, true, status_code);
    }

    validate(schema, data) {
        return schema.validate(data);
    }

    error(res, code = 400) {
        return new ResponseData(res, false, code);
    }

    validationError(res, joiError) {
        return new ResponseData(res, false, 400).json(joiError.details.map(e => e.message));
    }

    notFound(res, message = 'Resource could not be found') {
        return new ResponseData(res, false, 404).message(message).send();
    }

    badRequest(res, message = 'Please check your request') {
        return new ResponseData(res, false, 400).message(message).send();
    }

    unauthorised(res, message = 'Unauthorised') {
        return new ResponseData(res, false, 401).message(message).send();
    }

    handleException(res, e) {
        const message = typeof e === 'string' ? e : e.message;
        console.log(message);
        return new ResponseData(res, false, 500).message(message).send();
    }
}

module.exports = {ResponseData, BaseController};