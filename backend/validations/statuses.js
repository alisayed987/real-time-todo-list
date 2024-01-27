const Joi = require('joi');

const createStatusSchema = Joi.object({
    name: Joi.string().required(),
});

const updateStatusSchema = Joi.object({
    name: Joi.string().required(),
});

module.exports = {
    createStatusSchema,
    updateStatusSchema
};