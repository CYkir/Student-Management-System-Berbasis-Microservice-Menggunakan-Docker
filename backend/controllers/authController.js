const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE email=?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0)
        return res.status(401).json({
          message: "Email tidak ditemukan",
        });

      const admin = result[0];

      const valid = await bcrypt.compare(password, admin.password);

      if (!valid)
        return res.status(401).json({
          message: "Password salah",
        });

      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );

      res.json({
        token,
      });
    },
  );
};
