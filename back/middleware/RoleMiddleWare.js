const User = require("../models/User.model");


 function checkRole(role) {
    return async function (req, res, next) {
      const user= await User.findById(req.user.id);//Assuming the user role is available in req.user after authentication
        console.log(user);
      

      if (!user){
        return res.status(403).json({message : "User Not allowed"});
      }

      // Check if the user has the required role
      if (user.role === role) {
        return next(); // User has the required role, proceed to the next middleware/route handler
      } else {
        return res.status(403).json({ message: "Forbidden - Insufficient role" });
      }
    };
  }
  
  module.exports = checkRole;