const db = require("../config/db");

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};


// CREATE STUDENT
exports.createStudent = (req, res) => {
  const { nama, nim, prodi, semester } = req.body;

  if (!nama || !nim || !prodi || !semester) {
    return res.status(400).json({
      success: false,
      message: "Semua field wajib diisi",
    });
  }

  const sql =
    "INSERT INTO students (nama, nim, prodi, semester) VALUES (?, ?, ?, ?)";

  db.query(sql, [nama, nim, prodi, semester], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menambahkan mahasiswa",
        error: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Mahasiswa berhasil ditambahkan",
      data: {
        id: result.insertId,
        nama,
        nim,
        prodi,
        semester,
      },
    });
  });
};

// UPDATE STUDENT
exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { nama, nim, prodi, semester } = req.body;

  if (!nama || !nim || !prodi || !semester) {
    return res.status(400).json({
      success: false,
      message: "Semua field wajib diisi",
    });
  }

  const sql =
    "UPDATE students SET nama=?, nim=?, prodi=?, semester=? WHERE id=?";

  db.query(sql, [nama, nim, prodi, semester, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengubah data mahasiswa",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Data mahasiswa tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Data mahasiswa berhasil diperbarui",
    });
  });
};

// GET STUDENT BY ID
exports.getStudentById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM students WHERE id=?";
    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data mahasiswa",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data mahasiswa tidak ditemukan"
            });
        }
        res.json({
            success: true,
            message: "Detail mahasiswa berhasil diambil",
            data: result[0]
        });
    });
};

// DELETE STUDENT
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM students WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus data mahasiswa",
                error: err.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Data mahasiswa tidak ditemukan"
            });
        }
        res.json({
            success: true,
            message: "Data mahasiswa berhasil dihapus"
        });
    });
};
