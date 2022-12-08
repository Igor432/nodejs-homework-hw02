const express = require("express");
const func = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.get("/", async(req, res) => {
    res.json(await func.listContacts());
});

router.get("/:contactId", async(req, res, next) => {
    const id = req.params.contactId;
    const contacts = await func.listContacts();
    const [contact] = contacts.filter((contact) => contact.id === id);
    if (contact) {
        res.status(200).json(await func.getContactById(id));
    } else {
        res.status(404).json({ message: "not found" });
    }
});

router.post("/", async(req, res, next) => {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(10).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(8).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        console.log(validationResult)
        res.status(404).json({ message: "Invalid data" });
    } else {
        console.log(validationResult)

        await func.addContact(name, email, phone);
        res.status(201).json({ name, email, phone });
    }
});

router.delete("/:contactId", async(req, res, next) => {
    const contacts = await func.listContacts();
    const id = req.params.contactId;
    const [contact] = contacts.filter((contact) => contact.id === id);

    if (contact) {
        func.removeContact(id);
        res.status(200).json("success");
    } else {
        res.status(404).json({ message: "not found" });
    }
});

router.put("/:contactId", async(req, res, next) => {
    const contacts = await func.listContacts();
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(10).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(8).required(),
    });
    const [contact] = contacts.filter((contact) => contact.id === id);

    const validationResult = schema.validate(req.body)

    if (contact) {
        if (validationResult.error) {
            res.status(400).json({ message: "missing fields" });
        } else {
            await func.updateContact(id, name, email, phone);
            res.status(200).json({ message: "success" });
        }
    }
    res.status(404).json({ message: "not found" });
});

module.exports = router;