const config = require("../config/db.config");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

class userController{

    static async addUser(req,res){
        const { username, email, password, role } = req.body;
        try{

            const userExist = User.findOne({email});
            if(userExist){
                return res.status(409).json({ message: 'User already exists' });
            }

            const user = new User({
                username,
                email,
                password:bcrypt.hashSync(password),
                role,
            });
            await user.save();
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Error registering user' });
        }
    }

    static async updateUser(req,res){
        const {id} = req.params;
        const {password} = req.body;
        if (password){
            try{
                const userToUpdate = User.findById(id);
                if (!user){
                    return res.status(403).json({error:"User not found"})
                }

                user.password = bcrypt.hashSync(password);
                const newUser = User.findByIdAndUpdate(id,this.updateUser,{new:true});
                if (newUser){
                    return res.status(200).json({message:"user updated successfully"})
                }else{
                    return res.status(403).json({message:"couldn't update user"});
                }
            }catch(error){
                console.log(error);
                return res.status(500).json({error:"internal error occured"});
            }
        }
    }

    static async getAllUser(req,res){
        console.log("in get all method");
        const users =await User.find();
        return res.json(users);
    }


}
module.exports = userController;