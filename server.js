require('dotenv').config({ path: '../.env' })
const express = require('express')
const app = express()
const routes = require('./routes/index')

const bodyParser = require('body-parser')
const cors = require('cors')
const host = process.env.HOST
const port = process.env.PORT || 5000

var https = require('https')
var fs = require('fs')

const path = require('path')

httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, './certificates/burgerim.ru.key'), 'utf8'),

  cert: fs.readFileSync(path.join(__dirname, './certificates/burgerim.ru.crt'), 'utf8'),
}

//================================
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', routes)

// app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`))

//temp =============================

const mysql = require('mysql2')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })
const constants = require('./constants/constants')

const pool = mysql.createPool(constants.sqlConfig)

const executeSqlFile = (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf-8')
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

app.post('/api/uploadSql', upload.single('sqlFile'), (req, res) => {
  const { file } = req

  if (!file) {
    res.status(400).json({ error: 'No SQL file provided' })
    return
  }

  const filePath = path.join(__dirname, file.path)

  executeSqlFile(filePath)
    .then(() => {
      res.sendStatus(200)
      console.log('1qqqqqq')
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating table', details: error.message })
    })
    .finally(() => {
      fs.unlinkSync(filePath) // Удаляем временный файл после выполнения
    })
})

//===============================

// Create an HTTPS server and listen on port 443
https.createServer(httpsOptions, app).listen(443, () => {
  console.log('https Web server started at port : ', 443)
})
