const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    statusName: Joi.string().required()
});

const updateTaskSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    statusName: Joi.string()
});

module.exports = {
    createTaskSchema,
    updateTaskSchema
};