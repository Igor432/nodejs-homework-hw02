const express = require("express");
const contactsModel = require("../../models/contacts");
const { idValid, schema } = require("../../middlewares/middleware");

const router = express.Router();

router.get("/", async(req, res) => {
    res.json(await contactsModel.listContacts());
});

router.get("/:contactId", async(req, res, next) => {
    const id = req.params.contactId;
    const contacts = await contactsModel.listContacts();

    const validationResult = idValid.validate({ id });

    if (validationResult.error) {
        console.log(validationResult);
        res.status(404).json({ message: "Invalid data" });
    } else {
        const [contact] = contacts.filter((contact) => contact.id === id);

        if (contact) {
            res.status(200).json(await contactsModel.getContactById(id));
        } else {
            res.status(404).json({ message: "not found" });
        }
    }
});

router.post("/", async(req, res, next) => {
    const { name, email, phone } = req.body;
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        console.log(validationResult);
        res.status(404).json({ message: "Invalid data" });
    } else {
        console.log(validationResult);

        await contactsModel.addContact(name, email, phone);
        res.status(201).json({ name, email, phone });
    }
});

router.delete("/:contactId", async(req, res, next) => {
    const contacts = await contactsModel.listContacts();
    const id = req.params.contactId;
    const validationResult = idValid.validate({ id });
    if (validationResult.error) {
        console.log(validationResult);
        res.status(404).json({ message: "Invalid data" });
    } else {
        const [contact] = contacts.filter((contact) => contact.id === id);

        if (contact) {
            contactsModel.removeContact(id);
            res.status(200).json("success");
        } else {
            res.status(404).json({ message: "not found" });
        }
    }
});

router.put("/:contactId", async(req, res, next) => {
    const contacts = await contactsModel.listContacts();
    const id = req.params.contactId;
    const { name, email, phone } = req.body;

    const idValidation = idValid.validate({ id });
    if (idValidation.error) {
        console.log(idValidation);
        res.status(404).json({ message: "Invalid data" });
    } else {
        const [contact] = contacts.filter((contact) => contact.id === id);

        const validationResult = schema.validate(req.body);

        if (contact) {
            if (validationResult.error) {
                res.status(400).json({ message: "missing fields" });
            } else {
                await contactsModel.updateContact(id, name, email, phone);
                res.status(200).json({ message: "success" });
            }
        } else {
            res.status(404).json({ message: "not found" });
        }
    }
});

module.exports = router;