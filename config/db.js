require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_ATLAS;

const connectDB = async () => {
    try {
        await mongoose.connect(db, { dbName: "devconnector3" });

        console.log("DB connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;