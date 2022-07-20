import connection from "../database.js"


export async function getAllCategories(req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories;');
        res.status(200).send(categories.rows);
    } catch (e) {
        res.sendStatus(500);
    }

}

export async function  insertCategory(req,res){
    const name = res.locals.name;
    try {
        const categories = await connection.query('INSERT INTO categories (name) VALUES ($1);' , [name]);
        res.status(201).send(categories.rows);
    } catch (e) {
        res.sendStatus(500);
    }
    
}