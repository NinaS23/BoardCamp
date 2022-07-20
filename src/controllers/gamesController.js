import connection from "../database.js";

export async function getGames(req, res) {
    console.log("Oi")
    try {
        const games = await connection.query('SELECT * FROM games;');
        res.status(200).send(games.rows);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);

    }

}