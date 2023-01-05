const { Contact } = require('./schemas/contactModel')


const getContacts = async(pageSize, page, favorite, _id) => {


    if (favorite) {
        const results = await Contact.find({ favorite: true })

        return results
    } else {
        const results = await Contact.find({ owner: _id })
            .limit(pageSize)
            .skip(page * pageSize)
        return results
    }
}

module.exports = {
    getContacts
}