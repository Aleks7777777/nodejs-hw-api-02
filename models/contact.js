const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const numberRegexp = /^\d{+}\d{2}-\d{3}-\d{7}$/

const contactSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		// +38-097-7777777 
		match: numberRegexp,
		required: true,
	},
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

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
	number: Joi.number().pattern(numberRegexp).requiered(),
});

const schemas = {
	addSchema,
};

const Contact = model("contact", contactSchema);

module.export = {
	Contact,
	schemas,
}