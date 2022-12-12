const Joi = require("joi");


const idValidation = Joi.object({
    id: Joi.string().required()
})

module.exports = {
    idValidation
}