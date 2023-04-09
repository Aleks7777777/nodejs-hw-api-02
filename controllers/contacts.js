const { ctrlWrapper } = require("../utils");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");



const getAll = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result)
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.getContactById(id);
	if (!result) {
		throw HttpError(404, `Contacts with ${id} not found`);
	}
	res.json(result);
};
const add = async (req, res) => {
	const result = await contacts.addContacts(req.body);
	res.status(201).json(result);
};

const updateById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.updateById(id, req.body);
	if (!result) {
		throw HttpError(404);
	}
	res.json({ message: "Update success" });
};

const deleteById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.removeContact(id);
	if (!result) {
		throw HttpError(404, `Contacts with ${id} not found`);
	}
	res.json({
		message: "Delete success"
	})
};


module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	updateById: ctrlWrapper(updateById),
	deleteById: ctrlWrapper(deleteById),
}