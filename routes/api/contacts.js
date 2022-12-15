const express = require("express");
const router = express.Router();
const ctrlContact = require('../../controller/index');
const { authMiddleWare } = require("../../middlewares/authMiddleware");
const { validate, validateParams } = require('../../middlewares/middleware');
const { contactSchema, idSchema } = require("../../service/schemas/contactModel");

/*
router.use(authMiddleWare)
*/

router.get("/", authMiddleWare, ctrlContact.get);

router.get('/:id', authMiddleWare, validateParams(idSchema), ctrlContact.getContactById)

router.post('/', authMiddleWare, validate(contactSchema), ctrlContact.post)

router.put('/:id', authMiddleWare, validate(contactSchema), ctrlContact.put)

router.delete('/:id', authMiddleWare, validateParams(idSchema), ctrlContact.remove)

router.patch('/:id/favorite', authMiddleWare, validateParams(idSchema), ctrlContact.patch)

module.exports = router;