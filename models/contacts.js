const fs = require("fs/promises");
const path = require("path");

const listContacts = async() => {
    try {
        const contacts = await fs.readFile(path.join(__dirname, "contacts.json"));
        return JSON.parse(contacts);
    } catch (err) {
        console.log(err);
    }
};


const getContactById = async(contactId) => {
    try {
        const contacts = await listContacts();
        const id = contacts.filter((contact) => contact.id === contactId);
        console.log(id);
        return id;
    } catch (err) {
        console.log(err);
    }
};

const removeContact = async(contactId) => {
    try {
        const contacts = await listContacts();
        console.log(contacts.filter((contact) => contact.id !== contactId));
        return contacts.filter((contact) => contact.id !== contactId);
    } catch (err) {
        console.log(err);
    }
};

const addContact = async(name, email, phone) => {
    try {
        const contacts = await listContacts();
        const id = contacts.length + 1;
        contacts.push({
            id: id.toString(),
            name: name,
            email: email,
            phone: phone,
        });
        console.log(contacts)
    } catch (err) {
        console.log(err);
    }
};

const updateContact = async(contactId, name, email, phone) => {
    const contacts = await listContacts();
    contacts.forEach((contact) => {
        if (contact.id === contactId) {
            contact.name = name;
            contact.email = email;
            contact.phone = phone;
            console.log(contact);
            return contact;
        }
    });
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};