import connection from "../database.js";
import { costumersSchema } from "../Schemas/costumersSchema.js";


export async function ValidateCostumers(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;
    
    const birthdayDate = birthday.slice(0,10);
    const data = {name, phone, cpf, birthday: birthdayDate}
    const { error } = costumersSchema.validate(data);

    if (error) {
        console.log(error);
        return res.status(400).send(error.details);
    }

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        if (customer.rows.length !== 0) {
            return res.status(409).send('CPF já cadastrado!');
        }
    } catch (e) {
        res.sendStatus(500);
    }
    
    next();
    
}