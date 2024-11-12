const express = require('express');
const router = express.Router(); // untuk menggunakan router dari express

// memanggil module yg sudah diexport
const db = require('../connection')
const response = require('../response')


// endpoint untuk get all data akun
router.get('/', (req, res) => {
    const sql = `SELECT * FROM akun`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database akun error", details: err.message });
        }
        response(200, result, "get all data from akun", res)
    })
})

// get data berdasarkan id
router.get("/:id", (req, res)=>{
    let sql = `SELECT * FROM akun WHERE id_akun = ${req.params.id}`
    
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database id error", details: err.message });
        }
        response(200, result, "find via id", res)
        })
})




module.exports = router;