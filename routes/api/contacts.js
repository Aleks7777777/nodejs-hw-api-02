const express = require("express");

const Joi = require("joi");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": `"name" must be exist`,
		"string.base": `"name" must be string`,
		"string.empty": `"name" cannot be empty`
	}),
	email: Joi.string().required().messages({
		"any.required": `"email" must be exist`,
		"string.base": `"email" must be string`,
		"string.empty": `"email" cannot be empty`
	}),
	phone: Joi.string().required().messages({
		"any.required": `"number" must be exist`,
		"string.base": `"number" must be string`,
		"string.empty": `"number" cannot be empty`
	}),
})

router.get("/", async (req, res, next) => {
	const result = await contacts.listContacts();
	res.json(result)
})

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.getContactById(id);

		if (!result) {
			throw HttpError(404, `Contacts with ${id} not found`);
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
		const result = await contacts.addContacts(req.body);
		res.status(201).json(result);
	}
	catch (error) {
		next(error);
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.removeContact(id);
		if (!result) {
			throw HttpError(404, `Contacts with ${id} not found`);
		}
		res.json({
			message: "Delete success"
		})
	}
	catch (error) {
		next(error);
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message)
		}
		const { id } = req.params;
		const result = await contacts.updateById(id, req.body);
		if (!result) {
			throw HttpError(404);
		}

		res.json({ message: "Update success" });
	} catch (error) {
		next(error)
	}

})

module.exports = router;


