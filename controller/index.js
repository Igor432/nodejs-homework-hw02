const { Contact } = require("../service/schemas/contactModel");
const Contacts = require("../service/contactService");

const get = async(req, res, next) => {
    /*
      pagination

      https://medium.com/bb-tutorials-and-thoughts/how-to-paginate-your-nodejs-rest-api-endpoints-e98daface04d

      */
    const { _id } = req.user;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const favorite = req.query.favorite;


    try {
        const results = await Contacts.getContacts(pageSize, page, favorite, _id);

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
};

const post = async(req, res, next) => {
    console.log(req.user._id);
    const { name, email, phone, favorite } = req.body;
    const { id } = req.params;
    const { _id } = req.user;
    console.log(_id, name, email, phone, favorite);
    try {
        const newContact = await Contact.create({
            id,
            name,
            email,
            phone,
            owner: _id,
        });
        await newContact.save();
        console.log(newContact);
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
        if (id) {
            const updatedContact = await Contact.findByIdAndUpdate({
                id,
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
        } else {
            res.status(404).json({
                status: "error",
                code: 404,
                data: "not found",
                message: `There's no contact by ${id}`,
            });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
};

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
};

const patch = async(req, res, next) => {
    const { id } = req.params;
    const { favorite } = req.body;
    console.log(id);
    console.log(favorite);
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
    }
    res.json({
        message: "missing field favorite",
    });
};

module.exports = {
    get,
    getContactById,
    post,
    put,
    remove,
    patch,
};