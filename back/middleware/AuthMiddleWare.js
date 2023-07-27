const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


 function isAuthenticated(req, res, next) {
 
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // If the Authorization header has the "Bearer" prefix, remove it
      req.headers["authorization"] = authHeader.substring("Bearer ".length);
    }else{
        return res.status(401).json({message : "Token not found"});
    }
  
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
   
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      req.user = decoded; // Save the decoded payload to the request object for later use
      next();
    });

  }

  module.exports = isAuthenticated;
