const { ctrlWrapper } = require("../utils");

const { Contact } = require("../models/contacts");

const { HttpError } = require("../helpers");


const getAll = async (req, res) => {
	const result = await Contact.find({}, "-createdAt -updatedAt");
	res.json(result)
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findById(id);
	if (!result) {
		throw HttpError(404, `Contacts with ${id} not found`);
	}
	res.json(result);
};
const add = async (req, res) => {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};

const updateById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.json({ message: "Update success" });
};

const deleteById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndDelete(id);
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