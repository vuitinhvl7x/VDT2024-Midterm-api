const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const studentRouter = require("./routes/studentRouter");
const metricsMiddleware = require("./middleware/metricsMiddleware");
const { register } = require("./metrics/metrics");
const metricsRouter = require("./routes/metricsRouter");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync().then(() => console.log("Database is ready"));

// Sử dụng middleware để đo thời gian xử lý request và đếm số lượng request
app.use(metricsMiddleware);

// Define routes using studentRouter
app.use("/api/students", studentRouter);
app.use(metricsRouter);

module.exports = app;
