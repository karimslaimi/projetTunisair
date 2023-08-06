const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

class userController{

    static async addUser(req,res){
        const { username, email, password, role } = req.body;
        try{

            const userExist = await User.findOne({email});
            if(userExist){
                return res.status(409).json({ message: 'User already exists' });
            }

            const user = new User({
                userName:username,
                email:email,
                password:bcrypt.hashSync(password),
                role:role,
            });
            await user.save();
            return res.status(200).json("user added successfully");
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Error registering user' });
        }
    }

    static async updateUser(req,res){
        const {id} = req.params;
        const {password} = req.body;
        console.log(id);
        console.log(password);
        if (password){
            try{
                const userToUpdate = await User.findById(id);
                if (!userToUpdate){
                    return res.status(403).json({error:"User not found"})
                }

                userToUpdate.password = bcrypt.hashSync(password);
                const newUser = await User.findByIdAndUpdate(id,userToUpdate,{new:true});
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
        const users =await User.find();
        return res.json(users);
    }

    static async deleteUser(req,res){
        const {id} = req.params;
        console.log(id);
        try{

            await User.deleteOne({ _id: id });
        }catch(error){
            return res.status(500).json({error:"error occured"});
        }
        return res.status(200).json({message:"user deleted"});
    }


}
module.exports = userController;