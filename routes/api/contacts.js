const express = require("express");
const router = express.Router();
const ctrlContact = require('../../controller/index')

router.get("/", ctrlContact.get);

router.get('/:id', ctrlContact.getContactById)

router.post('/', ctrlContact.post)

router.put('/:id', ctrlContact.put)

router.delete('/:id', ctrlContact.remove)

router.patch('/:id/favorite', ctrlContact.patch)

module.exports = router;