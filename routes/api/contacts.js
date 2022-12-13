const express = require("express");
const router = express.Router();
const ctrlContact = require('../../controller/index');
const { validate, validateId } = require("../../middleware/middleware");
const { bodyScheme, idValidation } = require('../../service/schemas/contactModel')

router.get("/", ctrlContact.get);

router.get('/:id', validateId(idValidation), ctrlContact.getContactById)

router.post('/', validate(bodyScheme), ctrlContact.post)

router.put('/:id', validateId(idValidation), validate(bodyScheme), ctrlContact.put)

router.delete('/:id', validateId(idValidation), ctrlContact.remove)

router.patch('/:id/favorite', validateId(idValidation), ctrlContact.patch)

module.exports = router;