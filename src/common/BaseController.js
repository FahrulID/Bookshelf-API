class BaseController {
    constructor(req, h, joiSchema = null) {
        if (new.target === BaseController) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        this.req = req;
        this.h = h;
        this.joiSchema = joiSchema;
    }

    async validate(data) {
        if (this.joiSchema !== null) {
            const { error } = await this.joiSchema.validate(data);

            if (error !== undefined)
                return await this.error(error.message, 400);
            else
                return undefined;
        }

        return undefined;
    }

    async response(status = null, message = null, data = null, code = null) {
        let response = {};
        if (status !== null) response.status = status;
        if (message !== null) response.message = message;
        if (data !== null) response.data = data;

        return await this.h.response(response).code(code);
    }

    async success(message, data, status = 200) {
        return await this.response('success', message, data, status);
    }

    async error(error, status = 500) {
        return await this.response('fail', error, null, status);
    }
}

module.exports = BaseController;