import dayjs from "dayjs";
import connection from "../database.js";


export async function getRents(req, res) {
    const { customerId, gameId } = req.query
    try {
        const { rows: rentals } = await connection.query(`
     SELECT rentals.*,
        customers.id AS "customerId",
        customers.name AS "customerName",
        games.id AS "gameId",
        games.name AS "gameName", 
        categories.id AS "categoryId",
        categories.name AS "categoryName"
     FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON categories.id = games."categoryId"
        ${customerId ? `WHERE customers.id = ${parseInt(customerId)}` : ""}
        ${gameId ? `WHERE games.id = ${parseInt(gameId)}` : ""}
        `)
        
        const listRentals = [] 

        for(let rent of rentals){//variável of interável
            rent = {
                ...rent,
                customer: {
                    id: rent.customerId,
                    name: rent.customerName
                },
                game: {
                    id: rent.gameId,
                    name: rent.gameName,
                    categoryId: rent.categoryId,
                    categoryName: rent.categoryName
                }
            }
          
            listRentals.push(rent)
        }
        res.status(200).send(listRentals);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

}


export async function insertRent(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentdate = dayjs().format("YYYY-MM-DD");//rentdate
    const returnDate = null
    const delayfee = null
    try {
        const { rows: pricePerDay } = await connection.query('SELECT  games."pricePerDay" FROM  games WHERE id=$1', [gameId])
        const originalPrice = pricePerDay[0].pricePerDay * daysRented

        await connection.query(`
        INSERT INTO 
        rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice","delayFee")
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, rentdate, daysRented, returnDate, originalPrice, delayfee])

        res.status(201).send("created")
    } catch (e) {
    console.log(e)
    res.status(500).send("controlador rent")
}

}
