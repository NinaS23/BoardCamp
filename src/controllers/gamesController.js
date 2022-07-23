import connection from "../database.js";

export async function getGames(req, res) {
    const { name } = req.query
    try {
        if (!name) {
            const Allgames = await connection.query('SELECT * FROM games;');
            res.status(200).send(Allgames.rows);
        } else {
            const games = await connection.query(`
            SELECT *
            FROM games
            WHERE name LIKE '${name}%';`);
            res.status(200).send(games.rows);
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

}



export async function  insertGame(req,res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
             VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);
             res.sendStatus(201);
    }catch(e) {
        res.sendStatus(500);
    }
    
}