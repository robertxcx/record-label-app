const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (res, req, next) => {
    const token = req.headers["authorization"];
    if(!token) {
        return res.status(403).send("Login first");
    }

    try {
        const decoded = jwt.verify(token, config.MY_SECRET);
        req.user = decoded;
    } catch(err) {return res.status(401).send("Invalid token");}
    return next();
};
module.exports = verifyToken;