const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');
const Table = require('cli-table');

const db = new sqlite3.Database('./latihan18.db');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// ==========================================
// 1. DATABASE INITIALIZATION
// ==========================================
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS jurusan (kode_jurusan TEXT PRIMARY KEY, nama_jurusan TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS mahasiswa (nim TEXT PRIMARY KEY, nama TEXT, alamat TEXT, kode_jurusan TEXT, FOREIGN KEY(kode_jurusan) REFERENCES jurusan(kode_jurusan))`);
    db.run(`CREATE TABLE IF NOT EXISTS dosen (nip TEXT PRIMARY KEY, nama_dosen TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS matakuliah (kode_mk TEXT PRIMARY KEY, nama_mk TEXT, sks INTEGER)`);
    db.run(`CREATE TABLE IF NOT EXISTS kontrak (id INTEGER PRIMARY KEY AUTOINCREMENT, nim TEXT, kode_mk TEXT, nip TEXT, nilai TEXT)`);
});

// ==========================================
// 2. MODEL (Data Logic)
// ==========================================
class Model {
    static getAll(table, callback) {
        db.all(`SELECT * FROM ${table}`, [], (err, rows) => callback(err, rows));
    }

    static find(table, column, value, callback) {
        db.get(`SELECT * FROM ${table} WHERE ${column} = ?`, [value], (err, row) => callback(err, row));
    }

    static add(table, columns, values, callback) {
        const placeholders = columns.map(() => '?').join(',');
        db.run(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${placeholders})`, values, callback);
    }

    static delete(table, column, value, callback) {
        db.run(`DELETE FROM ${table} WHERE ${column} = ?`, [value], callback);
    }

    static getKontrakDetail(callback) {
        const sql = `SELECT k.id, k.nim, m.nama, mk.nama_mk, d.nama_dosen, k.nilai 
                     FROM kontrak k
                     LEFT JOIN mahasiswa m ON k.nim = m.nim
                     LEFT JOIN matakuliah mk ON k.kode_mk = mk.kode_mk
                     LEFT JOIN dosen d ON k.nip = d.nip`;
        db.all(sql, [], (err, rows) => callback(err, rows));
    }
}

// ==========================================
// 3. VIEW (Display Logic)
// ==========================================
class View {
    static line() { console.log("==============================================================="); }
    static header() {
        this.line();
        console.log("Welcome to Universitas Darussalam Gontor");
        console.log("Jl. Kacapiring No. 1945");
        this.line();
    }
}

// ==========================================
// 4. CONTROLLER (Main Logic)
// ==========================================
class Controller {
    static start() {
        View.header();
        this.login();
    }

    static login() {
        rl.question("username : ", (user) => {
            rl.question("password : ", (pass) => {
                if ( !user || !pass) {
                    console.log("\n[!] Username dan password wajib diisi!");
                    console.log("[!] Masukkan username dan pasword dengan benar kembali!\n")
                    return this.login();
                } else {
                    console.log(`\nWelcome, ${user}. Access Level: ADMIN\n`);
                    this.mainMenu();
                }
            });
        });
    }

    static mainMenu() {
        View.line();
        console.log("Silahkan pilih opsi di bawah ini :");
        console.log("[1] Mahasiswa\n[2] Jurusan\n[3] Dosen\n[4] Mata Kuliah\n[5] Kontrak\n[6] Keluar");
        View.line();
        rl.question("Masukkan nomor opsi : ", (choice) => {
            switch (choice) {
                case '1': this.genericSubMenu("Mahasiswa", "mahasiswa", ["nim", "nama", "alamat", "kode_jurusan"], "nim"); break;
                case '2': this.genericSubMenu("Jurusan", "jurusan", ["kode_jurusan", "nama_jurusan"], "kode_jurusan"); break;
                case '3': this.genericSubMenu("Dosen", "dosen", ["nip", "nama_dosen"], "nip"); break;
                case '4': this.genericSubMenu("Mata Kuliah", "matakuliah", ["kode_mk", "nama_mk", "sks"], "kode_mk"); break;
                case '5': this.kontrakMenu(); break;
                case '6': 
                    console.log("\nTerima kasih & Sampai jumpa kembali.");
                    process.exit(0);
                default: this.mainMenu();
            }
        });
    }

    // Menu Otomatis untuk opsi 1-4 (Mahasiswa, Jurusan, Dosen, MK)
    static genericSubMenu(title, table, cols, idCol) {
        View.line();
        console.log(`[ Menu ${title} ]`);
        console.log(`[1] Daftar ${title}\n[2] Cari ${title}\n[3] Tambah ${title}\n[4] Hapus ${title}\n[5] Kembali`);
        rl.question("Pilih opsi : ", (opt) => {
            if (opt === '1') {
                Model.getAll(table, (err, rows) => {
                    const t = new Table({ head: cols.map(c => c.toUpperCase()) });
                    rows.forEach(r => {
                        t.push(Object.values(r).map(v => v ?? '-'));
                    });
                    console.log(t.toString());
                    this.genericSubMenu(title, table, cols, idCol);
                });
            } else if (opt === '2') {
                rl.question(`Masukkan ${idCol} yang Anda cari: `, (id) => {
                    Model.find(table, idCol, id, (err, row) => {
                        if (row) console.log(`\n${idCol} yang anda cari ditemukan:`, row);
                        else console.log(`\n[!] ${idCol} yang anda cari tidak ada.`);
                        this.genericSubMenu(title, table, cols, idCol);
                    });
                });
            } else if (opt === '3') {
                let inputs = [];
                let ask = (i) => {
                    if (i < cols.length) {
                        rl.question(`${cols[i]} : `, (val) => {
                            inputs.push(val);
                            ask(i + 1);
                        });
                    } else {
                        Model.add(table, cols, inputs, () => {
                            console.log(`\nData yang anda masukkan ${title} berhasil ditambahkan!`);
                            this.genericSubMenu(title, table, cols, idCol);
                        });
                    }
                };
                ask(0);
            } else if (opt === '4') {
                rl.question(`Data yang anda masukkan ${idCol} yang dihapus : `, (id) => {
                    Model.delete(table, idCol, id, () => {
                        console.log(`\nData ${id} telah dihapus.`);
                        this.genericSubMenu(title, table, cols, idCol);
                    });
                });
            } else { this.mainMenu(); }
        });
    }

    static kontrakMenu() {
        View.line();
        console.log("[ Menu Kontrak ]");
        console.log("[1] Daftar Kontrak\n[2] Tambah Kontrak\n[3] Hapus Kontrak\n[4] Kembali");
        rl.question("Pilih opsi : ", (opt) => {
            if (opt === '1') {
                Model.getKontrakDetail((err, rows) => {
                    const t = new Table({ head: ['ID', 'NIM', 'Nama', 'MK', 'Dosen', 'Nilai'] });
                    rows.forEach(r => {
                        const safeRow = Object.values(r).map(v => 
                            v === null || v === undefined ? '-' : v
                        );
                        t.push(safeRow);
                    });
                    console.log(t.toString());
                    this.kontrakMenu();
                });
            } else if (opt === '2') {
                rl.question("NIM : ", (nim) => {
                    rl.question("Kode MK : ", (mk) => {
                        rl.question("NIP Dosen : ", (nip) => {
                             rl.question("Nilai (A/B/C/D/E) : ", (nilai) => {
                            Model.add(
                                "kontrak", 
                                ["nim", "kode_mk", "nip", "nilai"], [nim, mk, nip, nilai], () => {
                                console.log("\nKontrak berhasil ditambahkan.");
                                this.kontrakMenu();
                            }
                        );
                    });
                });
            });
        });
    } else if (opt === '3') {
        rl.question("Masukkan ID Kontrak : ", (id) => {
            Model.delete("kontrak", "id", id, () => {
                console.log("\nKontrak dihapus.");
                this.kontrakMenu();
            });
        });
    } else { this.mainMenu(); }
});
}
}

Controller.start();