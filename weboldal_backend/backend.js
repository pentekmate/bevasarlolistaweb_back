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
      let id = JSON.stringify(rows[0].felhasznalo_id)
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
      let fhkepid = JSON.stringify(rows[0].felhasznalo_kep_id)
      res.send(fhkepid)
    }
  })
  connection.end()
})
app.get('/getkomment', (req, res) => {
  kapcsolat()

  connection.query('SELECT wm_nemertett_egyett,wm_jelentett,wm_egyetertett,id,Felhasznalo.felhasznalo_id,felhasznalo.felhasznalo_nev,felhasznalo.felhasznalo_kep_id,web_komment.wm_szoveg,DATE_FORMAT(web_komment.wm_datum, "%Y-%m-%d") AS wm_datum FROM `web_komment` inner JOIN felhasznalo on felhasznalo.felhasznalo_id=web_komment.wm_felhasznalo_id', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      res.send(rows)
    }
  })
  connection.end()
})
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
app.post('/adminlogin', (req, res) => {
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
app.post('/egyetert', (req, res) => {
  kapcsolat()

  connection.query('UPDATE `web_komment` SET `wm_egyetertett`=' + req.body.bevitel1 + ' WHERE `id`=' + req.body.bevitel2 + ';', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      res.send(rows)
    }
  })
  connection.end()
})
app.post('/nemegyetert', (req, res) => {
  kapcsolat()

  connection.query('UPDATE `web_komment` SET `wm_nemertett_egyett`=' + req.body.bevitel1 + ' WHERE `id`=' + req.body.bevitel2 + ';', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      res.send(rows)
    }
  })
  connection.end()
})
app.post('/jelentes', (req, res) => {
  kapcsolat()

  connection.query('UPDATE `web_komment` SET `wm_jelentett`=' + req.body.bevitel1 + ' WHERE `id`=' + req.body.bevitel2 + ';', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      res.send(rows)
    }
  })
  connection.end()
})

app.post('/kommentfel', (req, res) => {
  kapcsolat()

  connection.query('INSERT INTO `web_komment` VALUES (NULL,"' + req.body.bevitel1 + '",CURRENT_DATE(),' + req.body.bevitel2 + ',0,0,0);', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      res.send(rows)
    }
  })
  connection.end()
})
app.delete('/kommenttorlese', (req, res) => {
  kapcsolat()

  connection.query('DELETE FROM web_komment WHERE id = "' + req.body.bevitel1 + '"', (err, rows, fields) => {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }
  })
  connection.end()

})
app.get('/felhasznalokepek', (req, res) => {
  kapcsolat()

  connection.query('select * from kepek', (err, rows, fields) => {
    if (err) throw err


    res.send(rows)
  })
  connection.end()
})
app.post('/profkepfrissites', (req, res) => {
  kapcsolat()

  connection.query('UPDATE `felhasznalo` SET `felhasznalo_kep_id`=' + req.body.bevitel1 + ' WHERE `felhasznalo_id`=' + req.body.bevitel2 + ';', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }
  })
  connection.end()

})
app.get('/jelentettkomment', (req, res) => {
  kapcsolat()

  connection.query('SELECT felhasznalo.felhasznalo_nev,id,felhasznalo.felhasznalo_nev,wm_szoveg FROM web_komment INNER JOIN felhasznalo ON web_komment.wm_felhasznalo_id = felhasznalo.felhasznalo_id where wm_jelentett>0', (err, rows, fields) => {
    if (err) throw err


    res.send(rows)
  })
  connection.end()
})
app.post('/felhasznalonevek', (req, res) => {
  kapcsolat()
  let egyezes=0
  connection.query('SELECT felhasznalo_nev FROM felhasznalo;', (err, rows, fields) => {
    if (err) throw err
    else{
      rows.map((item)=>{
        if(item.felhasznalo_nev==req.body.bevitel1)
        {
          egyezes+=1
        }
      })
    }
    if(egyezes>0)
    {
      res.send(false)
    }
    else{
      res.send(true)
     
    }
  })
  connection.end()
})

  app.post('/felhasznalonevfrissites', (req, res) => {
    kapcsolat()
  
    connection.query('UPDATE `felhasznalo` SET `felhasznalo_nev`="' +req.body.bevitel1 + '" WHERE `felhasznalo_id`=' + req.body.bevitel2 + ';', function (err, rows, fields) {
      if (err)
        console.log(err)
      else {
       
        res.send(true)
      }
    })
    connection.end()
  
  })
  app.post('/regisztraciodatum', (req, res) => {
    kapcsolat()
  
    connection.query("SELECT YEAR(`felhasznalo_regisztrdatum`)as'datum',MONTH(felhasznalo_regisztrdatum) as 'honap',DAY(felhasznalo_regisztrdatum) as 'nap'  FROM `felhasznalo` WHERE `felhasznalo_id`=" + req.body.bevitel1 + "", function (err, rows, fields) {
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
