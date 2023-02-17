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



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})