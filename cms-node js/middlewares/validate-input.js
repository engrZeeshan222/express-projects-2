const Joi = require("joi");

const inputValidator = (JoiSchema) => {
    return async (req, res, next) => {
        try {
            const value = await JoiSchema.validateAsync(req.body, {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true
            });
            req.body = value
            next()
        }
        catch (err) {
            console.log(err)
            const errors = err.details.map(({message, path}) => {
                return {message}
            });
            res.status(422).json({errors})
        };
    }
}

module.exports = inputValidator
