

import connection from "../database.js";

export async function getAllCostumers(req, res) {
    const { cpf, limit, offset } = req.query;
    try {
        if (!cpf) {

            const customers = await connection.query(`
            SELECT * FROM customers
            ${limit ? `LIMIT ${parsenint(limit)}` : ""}
            ${offset ? `OFFSET ${parsenint(offset)}` : ""}
            `);
            return res.status(200).send(customers.rows);

        } else {
            const customersCpf = await connection.query(`
        SELECT * FROM customers WHERE cpf LIKE '${cpf}%';`);
           return  res.status(200).send(customersCpf.rows);
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
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
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);

    }
}

export async function updateCustumerById(req,res){
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    try{
        await connection.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;', [name, phone, cpf, birthday, id]);
        res.status(200).send('dados modificados com sucesso!')
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }


}
