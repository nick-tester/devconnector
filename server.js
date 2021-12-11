import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import * as route from "./routes/index.js";
import setHeaders from "./middlewares/setheaders.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: true }));
app.use(setHeaders);

app.use("/api/users", route.users);
app.use("/api/posts", route.posts);
app.use("/api/profile", route.profile);
app.use("/api/auth", route.auth);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}...`));