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





//===============================


// Create an HTTPS server and listen on port 443
https.createServer(httpsOptions, app).listen(443, () => {
  console.log('https Web server started at port : ', 443)
})
