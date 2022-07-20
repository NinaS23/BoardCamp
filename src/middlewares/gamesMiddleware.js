
import connection from "../database.js";

export default async function gamesMiddleware( req, res, netx){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        const { rows } = await connection.query('SELECT * FROM categories WHERE id = $1;', [categoryId]);
       if(rows.length === 0 ){
          return res.status(400).send("preencha com o id existente!")
       }
       if(!name){
        return res.status(400).send("preencha os dados corretamente!")
       }
       if( stockTotal <= 0 || pricePerDay <= 0 ){
         return res.status(400).send("preencha os dados corretamente!")
       }

        const gameName = await connection.query('SELECT * FROM games WHERE name = $1;', [name]);
        if (gameName.rows.length !== 0) {
            return res.status(409).send('jogo já existente!');
        }
    }catch(e) {
        res.sendStatus(500);
    }
    res.locals.name = name;
    res.locals.image = image;
    res.locals.stockTotal = stockTotal;
    res.locals.categoryId = categoryId;
    res.locals.pricePerDay = pricePerDay;
    netx()
}
