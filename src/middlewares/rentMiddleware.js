import connection from "../database.js";

export async function insertRentMiddleware(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        const game = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if (!customer.rows[0] || !game.rows[0] ) {
            return res.status(400).send('preencha os dados corretamente!');
        }
        if(daysRented <= 0){
            return res.status(400).send('preencha os dados corretamente!');
        }

        const { stockTotal } = game.rows[0]
        const rentals = await connection.query(`SELECT "returnDate" FROM rentals WHERE "returnDate" IS NULL AND "gameId" = $1`, [gameId]);
        if (rentals.rows.length >= stockTotal) {
            return res.status(400).send('Jogo ocupado!');
        }

    } catch (e) {
        res.sendStatus(500);
    }

    next();
}