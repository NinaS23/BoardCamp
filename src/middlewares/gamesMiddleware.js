import connection from "../database.js";

export async function   gamesMiddleware(req, res, next) {
    const { name, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        const { rows } = await connection.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
        if (!name  || rows.length === 0) {
            return res.status(400).send('Dados inválidos!');
        } 
        if( stockTotal <= 0 || pricePerDay <= 0 ){
            return res.status(400).send('valores inválidos!');
        }

        const isGameExistent = await connection.query('SELECT * FROM games WHERE name = $1', [name]);
        if (isGameExistent.rows.length !== 0) {
            return res.status(409).send('Jogo já cadastrado!');
        }
    }catch(e) {
        res.sendStatus(500);
    }

    next();
}