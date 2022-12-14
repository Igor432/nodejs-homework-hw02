const express = require("express");
const router = express.Router();
const ctrlContact = require('../../controller/index');
const { authMiddleWare } = require("../../middlewares/authMiddleware");
const { validate, validateParams } = require('../../middlewares/middleware');
const { contactSchema, idSchema } = require("../../service/schemas/contactModel");


router.use(authMiddleWare)

router.get("/", ctrlContact.get);

router.get('/:id', validateParams(idSchema), ctrlContact.getContactById)

router.post('/', validate(contactSchema), ctrlContact.post)

router.put('/:id', validate(contactSchema), ctrlContact.put)

router.delete('/:id', validateParams(idSchema), ctrlContact.remove)

router.patch('/:id/favorite', validateParams(idSchema), ctrlContact.patch)

module.exports = router;