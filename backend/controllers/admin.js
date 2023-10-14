const User = require("../model/user")

const getUsers = async (req, res) => {
    try {
        const result = await User.find();
        if (!result) {
            return res.status(404).json({ message: "No user found!" })
        }
        return res.status(200).json({ users: result })

    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteUser = async (req, res)=> {
    const {userId} = req.params

    if(!userId) {
        return res.status(400).json({message: "Please provide an userId!"})
    }

    try{
        const userFound = await User.findOne({_id: userId}).exec()
        if(!userFound){
            return res.status(404).json({message: "No user found with this id!"})
        }
        const result = await userFound.deleteOne({_id: userFound._id})
        return res.status(204).json({message: "User successfully deleted. ", result})

    }catch(err){
        return res.status(500).json({err})
    }
}

module.exports = {getUsers, deleteUser}