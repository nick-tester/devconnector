import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
    // get token from header
    const token = req.header("x-auth-token");

    // check if no token
    if(!token) {
        return res.status(401).json({ errors: [{ msg: "No token, access denied!" }] });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded.user;

        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ errors: [{ msg: "Token is not valid..." }] })
    }
};