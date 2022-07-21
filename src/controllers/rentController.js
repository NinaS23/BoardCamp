
import connection from "../database.js";

export async function getRents(req, res) {
    const { customerId, gameId } = req.query
    try {
        if (!customerId && !gameId) {
            const rentals = await connection.query('SELECT * FROM rentals;');
            return res.status(200).send(rentals.rows);
        } 
        if(gameId) { 
            const gameId = await connection.query(`
            SELECT * FROM rentals WHERE gameId LIKE '${gameId}%';`);
            return res.status(200).send(gameId.rows);
        }
        if(customerId) {
            const customerId = await connection.query(`
        SELECT * FROM rentals WHERE customerId LIKE '${customerId}%';`);
            return res.status(200).send(customerId.rows);
        } 
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

}

