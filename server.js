const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const route = require("./routes");

dotenv.config();

const app = express();

connectDB();

app.use("/api/users", route.users);
app.use("/api/posts", route.posts);
app.use("/api/profile", route.profile);
app.use("/api/auth", route.auth);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}...`));