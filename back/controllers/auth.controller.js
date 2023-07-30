const config = require("../config/auth.config");

const User = require("../models/User.model");
const bcrypt = require ("bcryptjs");
var jwt = require("jsonwebtoken");


class authController {
    static async signin(req, res) {
        console.log(req.body.userName);
        try {
            const user = await User.findOne({ userName: req.body.userName });
            console.log(user);
            if (!user) {
                return res.status(403).send({ message: 'User not found' });
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });

            const authorities = `ROLE_${user.role.toUpperCase()}`;


            res.status(200).send({
                id: user._id,
                userName: user.userName,
                email: user.email,
                roles: authorities,
                token: token,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error signing in' });
        }
    }
}
module.exports = authController;
