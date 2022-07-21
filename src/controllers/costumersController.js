
import connection from "../database.js";

export  async function getAllCostumers(req, res) {
    const { cpf } = req.query;
    if(!cpf){
        try {
            const customers = await connection.query('SELECT * FROM customers;');
            res.status(200).send(customers.rows);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
    
        }
    }else{
        const customersCpf = await connection.query(`
        SELECT * FROM customers WHERE cpf LIKE '${cpf}%';`);
        res.status(200).send(customersCpf.rows);
    }

}

export async function getCostumersByID(req, res) {
   const id = res.locals.id
    try {
        const getCostumer = await connection.query('SELECT * FROM customers WHERE id = $1' , [id])
        res.status(200).send(getCostumer.rows);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

}

export async function insertCostumer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        console.log("entrei no try")
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);

    }
}