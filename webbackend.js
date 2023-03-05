const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const cors = require('cors')
const bcrypt = require('bcryptjs');
var connection

function kapcsolat() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bevasarlolista'
    })
}
app.use(express.json())
app.use(cors())

app.get('/felhasznalok', (req, res) => {
    kapcsolat()

    connection.query('SELECT * from felhasznalo', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})
app.delete('/felhasznalotorles', (req, res) => {
    kapcsolat()

    connection.query('DELETE FROM felhasznalo WHERE felhasznalo_id = "' + req.body.bevitel5 + '"', (err, rows, fields) => {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
    connection.end()

})
app.get('/osszesfelhasznalo', (req, res) => {
    kapcsolat()

    connection.query('SELECT listak_id,felhasznalo.felhasznalo_nev, listak_nev FROM `listak` INNER JOIN felhasznalo ON listak.listak_felhasznaloid = felhasznalo.felhasznalo_id', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})
app.delete('/listatorles', (req, res) => {
    kapcsolat()

    connection.query('DELETE FROM `listak` WHERE listak_id  = "' + req.body.bevitel5 + '"', (err, rows, fields) => {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
    connection.end()

})
app.post('/login', (req, res) => {
    kapcsolat()

    connection.query('SELECT * FROM `felhasznalo` WHERE `felhasznalo_nev` ="' + req.body.bevitel1 + '" ;', function (err, rows, fields) {
        if (err)
            console.log(err)
        else {
            if (rows.length > 0) {
                if (rows[0].felhasznalo_jelszo == req.body.bevitel2) {
                    res.send(true)
                }
                else {
                    res.send(false)
                }

            }
            else {
                res.send(false)
            }
        }

    })
    connection.end()
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})