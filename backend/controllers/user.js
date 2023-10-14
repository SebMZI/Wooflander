const User = require("../model/user")
const Image = require("../model/Images")
const Animal = require("../model/Animal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const path = require('path');
// const compressOptions = require("../config/compressImage.config")
// const imageCompression = require("browser-image-compression");


const createUser = async (req, res) => {
    const { email, password, username, tel, name, lastname, adress, roles } = req.body;
    if (!email || !password || !username || !tel || !name || !lastname || !adress) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    const userFound = await User.findOne({ email: email }).exec();
    const usernameFound = await User.findOne({ username: username }).exec()

    if (userFound) {
        return res.status(400).json({ message: "Email already used!" })
    }
    if (usernameFound) {
        return res.status(400).json({ message: "Username already used!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({
            name,
            lastname,
            email,
            password: hashedPassword,
            username,
            tel,
            adress,
            roles
        })

        const result = await newUser.save()
        console.log(result);
        return res.status(201).json({ message: "User created sucessfully", result })

    } catch (err) {
        console.log("Error in userController, createUser: ", err);
        return res.status(500).json({ error: err })
    }

}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    try {
        const userFound = await User.findOne({ username }).exec();
        if (!userFound) {
            return res.status(404).json({ message: "No user found!" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, userFound.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password incorrect!" })
        }

        const token = jwt.sign({
            username: username
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        })

        return res.status(200).json({ token })
    } catch (err) {
        console.log("Error in user Controller, login: ", err);
        return res.status(500).json({ error: err })
    }
}


const uploadImage = async (req, res) => {
    const { userId } = req.params
    const image = req.file

    if (!image) {
        return res.status(400).json({ message: "A file must be uploaded!" })
    }

    if (image?.size >= 4000000) {
        return res.status(400).json({ message: "The image size is more than 4MB!" })
    }
    if (!userId) {
        return res.status(400).json({ message: "An Id must be provided as a parameter!" })
    }

    const userFound = await User.findOne({ _id: userId }).exec()
    if (!userFound) {
        return res.status(404).json({ message: "No user matches the userId provided!" })
    }

    try {
        const newImage = new Image({
            image: {
                name: req.file.filename,
                path: req.file.path
            },
            userId: userId
        })

        await newImage.save()
        userFound.images.push(newImage._id)
        await userFound.save()

        return res.status(201).json({ message: "Image successfully uploaded !" })

    }
    catch (err) {
        console.log("Error in userController, uploadImage: ", err);
        return res.status(500).json(err)
    }

}

const getImage = async (req, res) => {
    const { userId } = req.params;


    if (!userId) {
        return res.status(400).json({ message: "User ID is required as a param!" })
    }

    try {
        const userFound = await User.findOne({ _id: userId }).exec()

        if (!userFound) {
            return res.status(404).json({ message: "User not found!" })
        }

        const image = userFound.images[userFound.images.length - 1]

        if (!image) {
            return res.status(404).json({ message: "Please upload an image first!" })
        }

        const imageFound = await Image.findOne({ _id: image._id }).exec()

        if (!imageFound) {
            return res.status(404).json({ message: "No image found!" })
        }

        const imagePath = path.join(__dirname, "..", 'images', imageFound.image.name)

        return res.status(200).sendFile(imagePath)

    } catch (err) {
        return res.status(500).json({ error: "Error in getImage", err })
    }
}

const addAnimal = async (req, res) => {
    const { userId } = req.params
    const image = req.file
    const { numProprio, numVeto, age, entente, race, caractere, name } = req.body

    if (!userId) {
        return res.status(400).json({ message: "Please provide an userID!" })
    }
    if (!numProprio || !numVeto || !age || !entente || !race || !caractere) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    if (image?.size >= 4000000) {
         return res.status(400).json({ message: "The image size is more than 4MB!" })
    }

    const userFound = await User.findOne({ _id: userId }).exec()

    if (!userFound) {
        return res.status(404).json({ message: "User not found!" })
    }

    try {
        const newAnimal = new Animal({
            proprio: userId,
            name,
            numVeterinaire: numVeto,
            numProprio,
            age,
            entente,
            race,
            caractere
        })

        await newAnimal.save()

        if (image) {
            const animalImage = new Image({
                image: {
                    name: req.file.filename,
                    path: req.file.path
                },
                userId: newAnimal._id
            })

            await animalImage.save()
            newAnimal.image.push(animalImage._id)
            await newAnimal.save()
        }

        userFound.animals.push(newAnimal._id)
        await userFound.save()


        return res.status(201).json({ message: "Animal successfully created!" })

    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

const getAllSitters =   async (req, res) =>{
    try{
        const result = await User.find({roles: {Sitter: 4592}}).select("-password").exec()
        if(!result){
            return res.status(404).json({message: "No Sitter found!"})
        }
        return res.status(200).json({sitters: result})

    }catch(err){
        return res.status(500).json({err})
    }
}




module.exports = { login, createUser, uploadImage, getImage, addAnimal, getAllSitters }