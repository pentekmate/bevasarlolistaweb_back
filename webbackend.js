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



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})