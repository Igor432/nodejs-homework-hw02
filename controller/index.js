const { Contact } = require("../service/schemas/contactModel");

const get = async(req, res, next) => {
    try {
        const results = await Contact.find();
        res.json({
            status: "success",
            code: 200,
            data: {
                contacts: results,
            },
        });
        console.log(results);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getContactById = async(req, res, next) => {
    const { id } = req.params;

    const result = await Contact.findById(id);

    try {
        if (result) {
            console.log(result);
            res.status(200).json({
                status: "success",
                code: 200,

                data: {
                    contacts: result,
                },
            });
        } else {
            res.status(404).json({
                status: "error",
                code: 404,
                message: `Contact by id ${id} doesn't exist`,
                data: "Not Found",
            });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
}


const post = async(req, res, next) => {
    const { name, email, phone, favorite } = req.body;
    console.log(name, email, phone, favorite);
    try {
        const newContact = await Contact.create({ name, email, phone });

        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                contacts: newContact,
            },
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

const put = async(req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            favorite,
        });
        res.status(200).json({
            status: "success",
            code: 200,
            data: { contacts: updatedContact },
        });

    } catch (e) {
        console.error(e);
        next(e);
    }
}


const remove = async(req, res, next) => {
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (deletedContact) {
            res.status(200).json({
                status: "success",
                code: 200,
                data: { contacts: deletedContact },
            });
        } else {
            res.status(404).json({
                status: "error",
                code: 404,
                message: `Id ${id} not found`,
                data: "Not Found",
            });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
}


const patch = async(req, res, next) => {
    const { id } = req.params;

    const { favorite } = req.body;

    if (favorite) {
        try {
            const patchedContact = await Contact.findByIdAndUpdate(id, { favorite });
            if (patchedContact) {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: {
                        contacts: patchedContact,
                    },
                });
            } else {
                res.status(404).json({
                    status: "error",
                    code: 404,
                    message: `Id ${id} not found`,
                    data: "not found",
                });
            }
        } catch (e) {
            console.error(e);
            next(e);
        }
    } else {
        res.json({
            message: "missing field favorite",
        });
    }
};


module.exports = {
    get,
    getContactById,
    post,
    put,
    remove,
    patch,
};