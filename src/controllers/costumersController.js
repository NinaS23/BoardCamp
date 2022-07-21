
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
        const customersWithcPF = await connection.query('SELECT * FROM customers WHERE cpf = {$1};' , [cpf]);
        res.status(200).send(customersWithcPF.rows);
    }

}

export  async function getCostumersByID(req,res){
    res.send("id")
}

export async function insertCostumer(req, res) {
    console.log("oi")
    const { name, phone, cpf, birthday } = req.body;
    try {
        console.log("entrei no try")
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);

    }
}