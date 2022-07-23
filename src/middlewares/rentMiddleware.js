import connection from "../database.js";

export async function insertRentMiddleware(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const isCustomerExistent = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        const isGameExistent = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if (!isCustomerExistent.rows[0] || !isGameExistent.rows[0] ) {
            return res.status(400).send('preencha os dados corretamente!');
        }
        if(daysRented <= 0){
            return res.status(400).send('preencha os dados corretamente!');
        }

        const { stockTotal } = isGameExistent.rows[0]
        const rentals = await connection.query(`SELECT "returnDate" FROM rentals WHERE "returnDate" IS NULL AND "gameId" = $1`, [gameId]);
        if (rentals.rows.length >= stockTotal) {
            return res.status(400).send('Jogo ocupado!');
        }

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

    next();
}

export async function deleteAndPostMiddleware(req, res, next) {
    const { id } = req.params;

    try {
        const rental = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);

        if (!rental.rows[0]) {
            return res.sendStatus(404);
        }

        if (rental.rows[0].returnDate !== null) {
            return res.status(400).send('Aluguel já finalizado!');
        }

        res.locals.rental = rental;

    } catch (e) {
        res.sendStatus(500);
    }
    
    

    next();
}