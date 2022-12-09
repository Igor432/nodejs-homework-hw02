const Joi = require("joi");



const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).required(),
    id: Joi.string(),
});

const idValid = Joi.object({
    id: Joi.string().required(),
});

module.exports = {
    schema,
    idValid
}