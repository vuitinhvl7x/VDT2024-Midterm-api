const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const studentRouter = require("./routes/studentRouter");
const metricsMiddleware = require("./middleware/metricsMiddleware");
const { register } = require("./metrics/metrics");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync().then(() => console.log("Database is ready"));

// Sử dụng middleware để đo thời gian xử lý request
app.use(metricsMiddleware);

// Expose metrics tại endpoint /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Define routes using studentRouter
app.use("/api/students", studentRouter);

module.exports = app;
