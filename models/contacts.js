
const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);

}

const getContactById = async (Id) => {
	const contacts = await listContacts();
	const result = contacts.find(item => item.id === Id);
	return result || null;
}

const addContacts = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContacts = {
		id: uuid(),
		name,
		email,
		phone,
	};
	contacts.push(newContacts);
	await updateContact(contacts);
	return newContacts;
}

const updateContact = async (id, { name, email, phone }) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(item => item.id === id);
	if (index === -1) {
		return null;
	}
	contacts[index] = { id, name, email, phone };
	await updateContact(contacts);
	return contacts[index];
}

const removeContact = async (Id) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(item => item.id === Id);
	if (index === -1) {
		return null;
	}

	const [result] = contacts.splice(index, 1);
	await updateContact(contacts);
	return result;
}



module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContacts,
	updateContact,
};
