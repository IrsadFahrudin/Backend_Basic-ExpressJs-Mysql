function loadData() {
    fetch('http://127.0.0.1:3020/inventory') // untuk mengambil data dari server
        .then((response) => response.json())
        .then((data) => {
            let output = '';
            let no = 1; // indeks no dimulai dari 1

            // mengakses elemen pertama dan setiap elemen
            data[0].data.forEach(el => {
                output += `
                    <tr>
                        <td>${no++}</td>
                        <td><img src="${el.gambar}" alt="${el.nama_barang}"></td>
                        <td>${el.nama_barang}</td>
                        <td>${el.deskripsi}</td>
                        <td>${el.kategori}</td>
                        <td>${el.status}</td>
                        <td>
                            <button class="edit-button" onclick="editItem(${el.id_inventory})">Edit</button>
                            <button class="delete-button" onclick="deleteItem(${el.id_inventory})">Delete</button>
                        </td>
                    </tr>
                `;
            });

            document.querySelector('tbody').innerHTML = output;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}


function showCreateForm() {
    document.getElementById("createForm").style.display = "block";
}
function hideCreateForm() {
    document.getElementById("createForm").style.display = "none";
}

// Fungsi untuk Tambah Barang
function createItem() {
    // Ambil data dari form input
    const nama_barang = document.getElementById("nama_barang").value;
    const gambar = document.getElementById("gambar").value;
    const deskripsi = document.getElementById("deskripsi").value;
    const kategori = document.getElementById("kategori").value;
    const status = document.getElementById("status").value;

    // Siapkan data untuk dikirim ke server
    const data = {
        nama_barang,
        gambar,
        deskripsi,
        kategori,
        status
    };

    // Kirim data ke server dengan metode POST
    fetch('http://127.0.0.1:3020/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message || "Data berhasil ditambahkan!");
            hideCreateForm();   // Sembunyikan form setelah data berhasil dikirim
            loadData();         // Muat ulang data di tabel
        })
        .catch(error => {
            console.error("Error menambahkan data:", error);
        });
}



function hideEditForm() {
    document.getElementById("editForm").style.display = "none";
}

// Fungsi untuk Edit Barang
function showEditForm(data) {
    // Mengakses objek pertama di dalam array data
    const inventoryData = data.data[0];

    // Data yang diterima adalah objek, tidak dalam array
    console.log("id_inventory pada edit:", inventoryData.id_inventory); 
    console.log("Data yang diterima untuk edit:", inventoryData);
    
    console.log("Struktur data yang diterima:", data);
    console.log("Isi data array:", data.data);
    console.log("Objek pertama dalam data:", data.data[0]); 

    // Mengisi form edit dengan data yang diterima
    document.getElementById("editForm").style.display = "block";
    document.getElementById("id_inventory").value = inventoryData.id_inventory;
    document.getElementById("edit_nama_barang").value = inventoryData.nama_barang || "";
    document.getElementById("edit_gambar").value = inventoryData.gambar || "";
    document.getElementById("edit_deskripsi").value = inventoryData.deskripsi || "";
    document.getElementById("edit_kategori").value = inventoryData.kategori || "";
    document.getElementById("edit_status").value = inventoryData.status || "";
}



function editItem(id_inventory) {
    // Dapatkan data item berdasarkan id_inventory
    fetch(`http://127.0.0.1:3020/inventory/${id_inventory}`)
        .then(response => response.json())
        .then(data => {

            console.log("Data yang diterima untuk edit:", data);

            if (data && data[0]) {
                showEditForm(data[0]); // Memasukkan data ke dalam form edit
            } else {
                console.error("Data item tidak ditemukan.");
            }
        })
        .catch(error => {
            console.error("Error fetching item data:", error);
        });
}
function updateItem() {
    // Ambil data dari form input
    const id_inventory = document.getElementById("id_inventory").value;
    const nama_barang = document.getElementById("edit_nama_barang").value;
    const gambar = document.getElementById("edit_gambar").value;
    const deskripsi = document.getElementById("edit_deskripsi").value;
    const kategori = document.getElementById("edit_kategori").value;
    const status = document.getElementById("edit_status").value;

    // Siapkan data untuk dikirim ke server
    const data = {
        id_inventory,
        nama_barang,
        gambar,
        deskripsi,
        kategori,
        status
    };

    console.log("Data yang dikirim untuk update:", data);

    // Kirim data ke server dengan metode PUT
    fetch('http://127.0.0.1:3020/inventory/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message || "Data berhasil diperbarui!");
            hideEditForm();   // Sembunyikan form setelah data berhasil diperbarui
            loadData();       // Muat ulang data di tabel
        })
        .catch(error => {
            console.error("Error mengubah data:", error);
        });
}


// Menghapus data inventory
function deleteItem(id_inventory) {
    // Konfirmasi kepada admin sebelum menghapus
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus item ini?");
    if (!confirmDelete) {
        return; // jika tidak, berhentikan fungsi
    }

    // Kirim permintaan DELETE ke server
    fetch('http://127.0.0.1:3020/inventory/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_inventory })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Terjadi kesalahan saat menghapus data.");
        }
        return response.json();
    })
    .then(result => {
        alert(result.message || "Data berhasil dihapus!");
        loadData(); // Muat ulang data
    })
    .catch(error => {
        console.error("Error deleting item:", error);
    });
}


loadData();
