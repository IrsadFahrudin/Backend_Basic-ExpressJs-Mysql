const express = require('express');
const router = express.Router(); // untuk menggunakan router dari express

// menggunakan module hasil export
const db = require('../connection')
const response = require('../response')


// Get All data Inventory /inventory
router.get('/', (req, res) => {
    const sql = `SELECT * FROM inventory`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database inventory error", details: err.message });
        }
        response(200, result, "get all data from inventory", res)
    })
})


// Get Inventory by Id /inventory/id
router.get('/:id_inventory', (req, res) => {
    const id_inventory = req.params.id_inventory
    const sql = `SELECT * FROM inventory WHERE id_inventory = ${id_inventory}`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database inventory error", details: err.message });
        }
        response(200, result, "get detail Inventory", res)
    })
})


// Create data Inventory /inventory
router.post('/', (req, res) => {
    const { nama_barang, gambar, deskripsi, kategori, status } = req.body
    const sql = `INSERT INTO inventory (nama_barang, gambar, deskripsi, kategori, status) VALUES ('${nama_barang}', '${gambar}', '${deskripsi}', '${kategori}', '${status}')`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database Add inventory error", details: err.message });
        }
        response(200, result, "Data sukses ditambahkan", res)
    })
})


// Update data Inventory /inventory
router.put('/', (req, res) => {
    const { id_inventory, nama_barang, gambar, deskripsi, kategori, status } = req.body

    // mengecek id_inventory tidak boleh kosong
    if (!id_inventory) {
        return res.status(400).json({ error: "id_inventory is required" });
    }

    const sql = ` UPDATE inventory SET nama_barang = '${nama_barang}', gambar = '${gambar}', deskripsi = '${deskripsi}', kategori = '${kategori}', status = '${status}' WHERE id_inventory = ${id_inventory}`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database Add inventory error", details: err.message });
        }
        response(200, result, "Data sukses diubah", res)
    })
})


// Delete data Inventory /inventory
router.delete('/', (req, res) => {
    const { id_inventory } = req.body
    const sql = `DELETE FROM inventory WHERE id_inventory = ${id_inventory}`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database Add inventory error", details: err.message });
        }
        response(200, result, "Deleted data Success", res)
    })
})


// router.get('/find', (req, res) => {
//     const sql = `SELECT username FROM akun WHERE id_akun = ${req.query.id_akun}`

//     db.query(sql, (err, result) => {
//         response(200, result, "find username akun", res)
//     })
// })


module.exports = router;
