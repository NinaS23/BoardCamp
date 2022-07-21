import connection from "../database.js";

export async function getGames(req, res) {
    const { name } = req.query
    if (!name) {
        try {
            const games = await connection.query('SELECT * FROM games;');
             res.status(200).send(games.rows);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);

        }
    }
    //fazer aq caso exista name , filtrar para passar os nomes dos games que começam com 
    // o name ou que são igual ao name

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