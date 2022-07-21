import DateExtension from '@joi/date';
import joi from 'joi';

const Date = joi.extend(DateExtension);

export const costumersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]{10}$|^[0-9]{11}$/).required(),
    cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
    birthday: Date.date().format('YYYY-MM-DD').raw().required()
});