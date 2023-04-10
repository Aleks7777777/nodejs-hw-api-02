
const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);

}

const getById = async (id) => {
	const contacts = await getAll();
	const result = contacts.find(item => item.id === id);
	return result || null;
}

const add = async ({ name, email, phone }) => {
	const contacts = await getAll();
	const newContact = {
		id: v4(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
}

const updateById = async (id, { name, email, phone }) => {
	const contacts = await getAll();
	const index = contacts.findIndex(item => item.id === id);
	if (index === -1) {
		return null;
	}
	contacts[index] = { id, name, email, phone };
	await updateContacts(contacts);
	return contacts[index];
}

const removeById = async (id) => {
	const contacts = await getAll();
	const index = contacts.findIndex(item => item.id === id);
	if (index === -1) {
		return null;
	}

	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);
	return result;
}



module.exports = {
	getAll,
	getById,
	removeById,
	add,
	updateById,
};
