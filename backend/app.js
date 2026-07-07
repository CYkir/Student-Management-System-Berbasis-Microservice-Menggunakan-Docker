require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

const client = require("./metrics");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "Student Management API",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    database: "Connected",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});



app.use("/api", authRoutes);
app.use("/api/students", studentRoutes);

app.use(logger);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  res.end(await client.register.metrics());
});

app.get("/health", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).json({
        status: "DOWN",

        database: "Disconnected",
      });
    }

    res.json({
      status: "UP",

      database: "Connected",

      uptime: process.uptime(),

      timestamp: new Date(),
    });
  });
});
