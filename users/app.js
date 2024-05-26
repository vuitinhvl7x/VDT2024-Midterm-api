const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const studentRouter = require("./routes/studentRouter");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync().then(() => console.log("Database is ready"));

// Define routes using studentRouter
app.use("/api/students", studentRouter);

module.exports = app;
