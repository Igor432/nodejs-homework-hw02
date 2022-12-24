const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            error.status(400)
            next(error)
        }
        next()
    }
}


const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params)
        if (error) {
            error.status(400)
            next(error)
        }
        next()
    }
}

module.exports = {
    validate,
    validateParams
}