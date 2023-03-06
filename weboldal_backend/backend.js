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
app.use(express.static('Kepek'))
app.use(express.json())
app.use(cors())

app.post('/login', (req, res) => {
    kapcsolat()
  
    connection.query('SELECT * FROM `felhasznalo` WHERE `felhasznalo_nev` ="' + req.body.bevitel1 + '" ;', function (err, rows, fields) {
      if (err)
        console.log(err)
      else {
        if (rows.length > 0) {
          const JelszoVissza = bcrypt.compare(req.body.bevitel2, rows[0].felhasznalo_jelszo)
            .then((talalt) => {
              if (talalt) {
                res.send(true)
              }
              else {
                res.send(false)
              }
            })
        }
        else {
          res.send(false)
        }
      }
  
    })
    connection.end()
  })
  app.post('/getid', (req, res) => {
    kapcsolat()
  
    connection.query('SELECT felhasznalo_id FROM `felhasznalo` WHERE `felhasznalo_nev` ="' + req.body.bevitel1 + '" ;', function (err, rows, fields) {
      if (err)
        console.log(err)
      else {
          let id=JSON.stringify(rows[0].felhasznalo_id)
          console.log(id)
          res.send(id)
        }
    })
    connection.end()
  })
  app.post('/getid', (req, res) => {
    kapcsolat()
  
    connection.query('SELECT felhasznalo_id FROM `felhasznalo` WHERE `felhasznalo_nev` ="' + req.body.bevitel1 + '" ;', function (err, rows, fields) {
      if (err)
        console.log(err)
      else {
          let id=JSON.stringify(rows[0].felhasznalo_id)
          console.log(id)
          res.send(id)
        }
    })
    connection.end()
  })
  app.post('/getprofilkep', (req, res) => {
    kapcsolat()
  
    connection.query('SELECT felhasznalo_kep_id FROM `felhasznalo` WHERE `felhasznalo_id` ="' + req.body.bevitel1 + '" ;', function (err, rows, fields) {
      if (err)
        console.log(err)
      else {
        let fhkepid=JSON.stringify(rows[0].felhasznalo_kep_id)
         res.send(fhkepid)
        }
    })
    connection.end()
  })
  app.get('/getkomment', (req, res) => {
    kapcsolat()
  
    connection.query('SELECT felhasznalo.felhasznalo_nev,felhasznalo.felhasznalo_kep_id,web_komment.wm_szoveg,web_komment.wm_datum FROM `web_komment` inner JOIN felhasznalo on felhasznalo.felhasznalo_id=web_komment.wm_felhasznalo_id;', function (err, rows, fields) {
      if (err)
        console.log(err)
      else {
       res.send(rows)
        }
    })
    connection.end()
  })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
