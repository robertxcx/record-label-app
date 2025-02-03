const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(403).send("Login first");
    }
  
    const token = authHeader.split(' ')[1]; 
  
    if (!token) {
        return res.status(403).send("Token is missing");
    }
  
    try {
      const decoded = jwt.verify(token, config.MY_SECRET);
      req.user = decoded;
    } catch (err) {
      console.log(err);
      return res.status(401).send("Invalid token");
    }
    return next();
  };
  module.exports = verifyToken;