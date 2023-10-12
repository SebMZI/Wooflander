const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    const {email, password,username,  tel, name, lastname, adress, roles} = req.body;
    if(!email || !password || !username || !tel || !name || !lastname || !adress){
        return res.status(400).json({message: "All fields are required!"})
    }

    const userFound = await User.findOne({email: email}).exec();
    const usernameFound = await User.findOne({username: username}).exec()

    if(userFound){
        return res.status(400).json({message: "Email already used!"})
    }
    if(usernameFound){
        return res.status(400).json({message: "Username already used!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const newUser = new User({
            name,
            lastname,
            email,
            hashedPassword,
            username,
            tel,
            adress, 
            roles
        })

        const result = await newUser.save()
        console.log(result);
        return res.status(201).json({result})

    }catch(err){
        console.log("Error in userController, createUser: ", err);
        return res.status(500).json({error: err })
    }

}

const login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "All fields are required!"})
    }

    try{
        const userFound = await User.findOne({username}).exec();
        if(!userFound){
            return res.status(404).json({message: "No user found!"})
        }

        const isPasswordCorrect = (await bcrypt.compare(password, userFound.password))
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Password incorrect!"})
        }

        const token = jwt.sign({
            username: username
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        })

        return res.status(200).json({token})
    }catch(err){
        console.log("Error in user Controller, login: ", err);
        return res.status(500).json({error: err})
    }
}




module.exports = {login, createUser}