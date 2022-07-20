import connection from "../database.js"


export async function getAllCategories(req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories;');
        return res.status(200).send(categories.rows);
    } catch (e) {
        res.sendStatus(500);
    }

}

export async function  insertCategory(req,res){
    const name = res.locals.name;
    try {
        const categories = await connection.query('INSERT INTO categories (name) VALUES ($1);' , [name]);
        return res.status(201).send('created');
    } catch (e) {
        res.sendStatus(500);
    }
    
}