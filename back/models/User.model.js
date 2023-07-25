const mangoose = require("mangoose");
const userRoles = {
    ADMIN: 'admin',
    CHEF: 'chef',
    AGENT: 'agent',
    FINANCIER: 'financier',
  };

const User = mangoose.model(
    "User",
    new mangoose.Schema({
      userName:String,
      email: String,
      password: String,
      resetPasswordToken:String,
      resetPasswordExpires:String,
     
      role:userRoles,
  
    })
  );
  
  module.exports = User;