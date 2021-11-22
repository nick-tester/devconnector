const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}...`));