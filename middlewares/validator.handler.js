const boom = require("@hapi/boom");


function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        const valid = error === undefined;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            next(boom.badRequest(message));
        }
    }
}

module.exports = {validatorHandler};