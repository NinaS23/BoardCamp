import connection from "../database.js";
import { costumersSchema } from "../Schemas/costumersSchema.js";


export async function ValidateCostumers(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;
 
    const data = {name, phone, cpf, birthday}
    const { error } = costumersSchema.validate(data);

    if (error) {
        console.log(error);
        return res.status(400).send(error.details);
    }

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        if (customer.rows.length !== 0) {
            return res.status(409).send('CPF inválido!');
        }
    } catch (e) {
        res.sendStatus(500);
    }
    
    next();
    
}

export async function IDcostumersMiddleware(req,res,next){
    const { id } = req.params;

    try{
        const customer = await connection.query('SELECT * FROM customers WHERE id = $1', [id]);
        if (customer.rows.length === 0) {
            return res.status(404).send('costumer não encontrado!');
        }
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    res.locals.id = id;
    next()
}

