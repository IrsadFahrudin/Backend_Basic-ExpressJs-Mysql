const mysql2 = require('mysql2')

// membuat koneksi ke database
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_webbackendinventory"
})


db.connect(err=>{
    if(err) console.log(err)
    else console.log("DB Running")
})



module.exports = db