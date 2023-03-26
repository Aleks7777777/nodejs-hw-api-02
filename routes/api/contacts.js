const express = require("express");

const Joi = require("joi");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
	title: Joi.string().required().messages({
		"any.required": `"title" must be exist`,
		"string.base": `"title" must be string`,
		"string.empty": `"title" cannot be empty`
	}),
	author: Joi.string().required().messages({
		"any.required": `"author" must be exist`,
		"string.base": `"author" must be string`,
		"string.empty": `"author" cannot be empty`
	}),
})

router.get('/', async (req, res, next) => {
	const result = await contacts.listContacts();
	res.json(result)
})

router.get("/:Id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.getById(id);

		if (!result) {
			throw HttpError(404, `Book with ${id} not found`);
		}
		res.json(result);
	}
	catch (error) {
		next(error);
	}
})

router.post("/", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message)
		}
		const result = await contacts.add(req.body);
		res.status(201).json(result);
	}
	catch (error) {
		next(error);
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.removeById(id);
		if (!result) {
			throw HttpError(404, `Book with ${id} not found`);
		}
		res.json({
			message: "Delete success"
		})
	}
	catch (error) {
		next(error);
	}
})

router.put("/:contactId", async (req, res, next) => {
	res.json({ message: 'template message' })
})

module.exports = router;


