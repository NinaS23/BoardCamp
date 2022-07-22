
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

