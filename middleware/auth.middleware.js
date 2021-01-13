const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    if (req === "OPTIONS") return next();

    try {
        const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

        if (!token) throw new Error();

        const decoded = jwt.verify(token, config.get("jwtSecret")); // decoding token
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "Not authorized." });
    }
}
