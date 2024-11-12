const express = require('express')
const bodyParser = require('body-parser') // untuk mengakses request body
const cors = require('cors') // untuk dapat digunakan di sisi frontend yang terpisah


// Routes, untuk mengumpulkan router yang ada
const indexRouter = require('./routes/indexRouter')
const crudInventory = require('./routes/crudInventory')


const app = express()
const hostname = '127.0.0.1'
const port = 3020


app.use(cors());
app.use(express.json())
app.use(bodyParser.json())



app.use('/inventory', crudInventory) // Endpoint untuk /inventory
app.use('/', indexRouter) // Endpoint untuk mengecek koneksi database /





app.listen(port, () => {
    console.log(`Server running at: http://${hostname}:${port}`)
})