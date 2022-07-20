import connection from "../database.js";

export async function  insertCategoryMiddlaware(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('preencha corretamente!');
    }
    try {
        const { rows } = await connection.query('SELECT * FROM categories WHERE name = $1', [name]);       
        if (rows.length !== 0) {
            return res.status(409).send('nome já cadastrado');
        }
    }catch(e) {
        res.sendStatus(500);
    }
    res.locals.name = name;

    next();
}