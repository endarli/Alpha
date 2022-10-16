const Joi = require("joi");

const fLetterSchema = Joi.object().keys({
    letter: Joi.string().required()
})

const womanCreateSchema = Joi.object().keys({
    letter: Joi.string().required(), 
    name: Joi.string().required(),
    parrafo: Joi.string().required(),
    date: Joi.string().required()
})

module.exports = {
    fLetterSchema,
    womanCreateSchema
}