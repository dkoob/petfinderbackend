const pg = require('pg')
//postgres
const client = new pg.Client('postgres://localhost/petfinderworkshop')
//postico
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/api/pets', async (req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM pets
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)
        
        
    } catch (error) {
        next(error)
    }
})

const init = async () => {
    await client.connect()
    console.log("connected to database")
    const SQL = `
        DROP TABLE IF EXISTS pets;
        CREATE TABLE pets(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            is_favorite BOOLEAN
        );
        INSERT INTO pets (name) VALUES ('John');
        INSERT INTO pets (name, is_favorite) VALUES ('Jimmy', true);
        INSERT INTO pets (name) VALUES ('Jake');
    `
    await client.query(SQL)
    console.log("table created!")
    
    const port = 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })



}

init()