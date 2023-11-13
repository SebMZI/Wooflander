const User = require("../model/user");
const Image = require("../model/Images");
const Pdf = require("../model/Pdf");
const ProfilePic = require("../model/PicProf");
const Animal = require("../model/Animal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const user = require("../model/user");
const host = "https://wooflander.onrender.com";
const mongoose = require("mongoose");
// const compressOptions = require("../config/compressImage.config")
// const imageCompression = require("browser-image-compression");

const createUser = async (req, res) => {
  const {
    email,
    password,
    username,
    tel,
    name,
    lastname,
    adress,
    roles,
    city,
    state,
  } = req?.body;

  console.log(
    email,
    password,
    username,
    tel,
    name,
    lastname,
    adress,
    roles,
    city,
    state
  );

  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.username ||
    !req.body.tel ||
    !req.body.name ||
    !req.body.lastname ||
    !req.body.adress ||
    !req.body.roles ||
    !req.body.city ||
    !req.body.state
  ) {
    return res.status(400).json({ message: "Missing or invalid input fields" });
  }

  const userFound = await User.findOne({ email: email }).exec();
  const usernameFound = await User.findOne({ username: username }).exec();

  if (userFound) {
    return res.status(400).json({ message: "Email already used!" });
  }
  if (usernameFound) {
    return res.status(400).json({ message: "Username already used!" });
  }

  let role;

  if (roles === "Client") {
    role = {
      Client: 2503,
    };
  } else if (roles === "Sitter") {
    role = {
      Sitter: 4592,
    };
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
      roles: role,
      city: city.toUpperCase(),
      state: state.toUpperCase(),
      isSubActive: false,
    });

    await newUser.save();

    if (req.file) {
      const newPdf = new Pdf({
        pdf: {
          name: req.file.filename,
          path: req.file.path,
        },
        userId: newUser._id,
      });

      await newPdf.save();
      newUser.pdf.push(newPdf._id);
      await newUser.save();
    }

    return res.status(201).json({ message: "User created sucessfully" });
  } catch (err) {
    console.log("Error in userController, createUser: ", err);
    return res.status(500).json({ error: err });
  }
};

const login = async (req, res) => {
  const { username, password } = JSON.parse(req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const userFound = await User.findOne({ username: username }).exec();
    if (!userFound) {
      return res.status(404).json({ message: "No user found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password incorrect!" });
    }

    const token = jwt.sign(
      {
        userInfo: {
          roles: userFound.roles,
          username: userFound.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      message: "Successfully logged in!",
      token,
      roles: userFound.roles,
      id: userFound._id,
      sessionId: userFound?.sessionId,
      isSubActive: userFound?.isSubActive,
    });
  } catch (err) {
    console.log("Error in user Controller, login: ", err);
    return res.status(500).json({ error: err });
  }
};

const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID provided!" });
  }

  try {
    const result = await User.findOne({ _id: userId })
      .select("-password")
      .exec();
    if (!result) {
      return res.status(404).json({ message: "No user matches this id!" });
    }
    return res.status(200).json({ userInfo: result });
  } catch (err) {
    console.log("Error in getUserProfile", err);
    return res.status(500).json({ error: err });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, tel, email, sessionId, customerId } = JSON.parse(req.body);
  console.log("Username: ", username, "Tel: ", tel, "Email: ", email);
  console.log(userId);
  if (!userId) {
    return res.status(400).json({ message: "No user Id provided!" });
  }

  try {
    const userFound = await User.findOne({ _id: userId }).exec();
    if (!userFound) {
      return res.status(404).json({ message: "No user matches this id!" });
    }
    if (username) userFound.username = username;
    if (tel) userFound.tel = tel;
    if (email) userFound.email = email;
    if (sessionId) userFound.sessionId = sessionId;
    if (customerId) userFound.customerId = customerId;

    const result = await userFound.save();
    return res
      .status(201)
      .json({ message: "User successfully updated!", result });
  } catch (err) {
    console.log("Error in updateUser: ", err);
    return res.status(500).json({ err });
  }
};

const addProfilePic = async (req, res) => {
  const { userId } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "A file must be uploaded!" });
  }

  if (image?.size >= 4000000) {
    return res
      .status(400)
      .json({ message: "The image size is more than 4MB!" });
  }
  if (!userId) {
    return res
      .status(400)
      .json({ message: "An Id must be provided as a parameter!" });
  }

  const userFound = await User.findOne({ _id: userId }).exec();
  if (!userFound) {
    return res
      .status(404)
      .json({ message: "No user matches the userId provided!" });
  }

  try {
    const newPic = new ProfilePic({
      pic: {
        name: req.file.filename,
        path: req.file.path,
      },
      userId: userId,
    });

    await newPic.save();
    userFound.images.pop();
    userFound.images.push(newPic._id);
    await userFound.save();

    return res.status(201).json({ message: "Image successfully uploaded !" });
  } catch (err) {
    console.log("Error in userController, addProfilePic: ", err);
    return res.status(500).json(err);
  }
};

const getProfilePic = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required as a param!" });
  }

  try {
    const userFound = await User.findOne({ _id: userId }).exec();

    if (!userFound) {
      return res.status(404).json({ message: "User not found!" });
    }

    const image = userFound.images[userFound.images.length - 1];

    if (!image) {
      return res
        .status(404)
        .json({ message: "Please upload a profile pic first!" });
    }

    const imageFound = await ProfilePic.findOne({ _id: image._id }).exec();

    if (!imageFound) {
      return res.status(404).json({ message: "No image found!" });
    }

    const img = `${host}/images/${imageFound.pic.name}`;

    return res.status(200).json({ img });
  } catch (err) {
    console.log("Error in GetProfilePic", err);
    return res.status(500).json({ error: "Error in getProfilePic", err });
  }
};

const uploadImage = async (req, res) => {
  const { userId } = req.params;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "A file must be uploaded!" });
  }

  if (image?.size >= 4000000) {
    return res
      .status(400)
      .json({ message: "The image size is more than 4MB!" });
  }
  if (!userId) {
    return res
      .status(400)
      .json({ message: "An Id must be provided as a parameter!" });
  }

  const userFound = await User.findOne({ _id: userId }).exec();
  if (!userFound) {
    return res
      .status(404)
      .json({ message: "No user matches the userId provided!" });
  }

  try {
    const newImage = new Image({
      image: {
        name: req.file.filename,
        path: req.file.path,
      },
      userId: userId,
    });

    await newImage.save();
    userFound.images.push(newImage._id);
    await userFound.save();

    return res.status(201).json({ message: "Image successfully uploaded !" });
  } catch (err) {
    console.log("Error in userController, uploadImage: ", err);
    return res.status(500).json(err);
  }
};

const getImage = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required as a param!" });
  }

  try {
    const userFound = await User.findOne({ _id: userId }).exec();

    if (!userFound) {
      return res.status(404).json({ message: "User not found!" });
    }

    const image = userFound.images[userFound.images.length - 1];

    if (!image) {
      return res.status(404).json({ message: "Please upload an image first!" });
    }

    const imageFound = await Image.findOne({ _id: image._id }).exec();

    if (!imageFound) {
      return res.status(404).json({ message: "No image found!" });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "images",
      imageFound.image.name
    );

    return res.status(200).sendFile(imagePath);
  } catch (err) {
    return res.status(500).json({ error: "Error in getImage", err });
  }
};

const addAnimal = async (req, res) => {
  try {
    const { userId, name, numProprio, numVeto, age, entente, race, caractere } =
      req.body;
    if (
      !userId ||
      !name ||
      !numProprio ||
      !numVeto ||
      !age ||
      entente === undefined ||
      !race ||
      !caractere
    ) {
      return res
        .status(400)
        .json({ message: "Missing or invalid input fields" });
    }

    const userFound = await User.findOne({ _id: userId }).exec();

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new animal
    const newAnimal = new Animal({
      proprio: userId,
      name,
      numVeterinaire: numVeto,
      numProprio,
      age,
      entente,
      race,
      caractere,
    });

    // Save the animal
    await newAnimal.save();

    if (req.file) {
      // If an image is uploaded, save it
      const animalImage = new Image({
        image: {
          name: req.file.filename,
          path: req.file.path,
        },
        userId: newAnimal._id,
      });

      await animalImage.save();
      newAnimal.image.push(animalImage._id);
      await newAnimal.save();
    }

    // Update the user's animals
    userFound.animals.push(newAnimal._id);
    await userFound.save();

    return res.status(201).json({ message: "Animal successfully created!" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllAnimal = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "No userId !" });

  try {
    const result = await Animal.find({ proprio: userId }).exec();
    if (!result) {
      return res.status(404).json({ message: "No animals found!" });
    }
    return res.status(200).json({ animals: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const getAllSitters = async (req, res) => {
  try {
    const result = await User.find({ roles: { Sitter: 4592 } })
      .select("-password")
      .exec();
    if (!result) {
      return res.status(404).json({ message: "No Sitter found!" });
    }
    return res.status(200).json({ sitters: result });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getAllOwners = async (req, res) => {
  try {
    const result = await User.find({ roles: { Client: 2503 } })
      .select("-password")
      .exec();
    if (!result) {
      return res.status(404).json({ message: "No Owner found!" });
    }
    return res.status(200).json({ owners: result });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getAnimalImage = async (req, res) => {
  const { animalId } = req.params;

  console.log("animalId:", animalId);

  if (!animalId) {
    return res
      .status(400)
      .json({ message: "Animal ID is required as a param!" });
  }

  try {
    const animalFound = await Animal.findOne({ _id: animalId }).exec();
    console.log("animalFound:", animalFound);

    if (!animalFound) {
      return res.status(404).json({ message: "Animal not found!" });
    }

    const image = animalFound.image;

    if (image.length === 0) {
      return res
        .status(404)
        .json({ message: "No image found for this animal!" });
    }

    const imageId = image[0];
    console.log("imageId:", imageId);

    const imageFound = await Image.findOne({ _id: imageId?._id }).exec();

    if (!imageFound) {
      return res.status(404).json({ message: "Image not found!" });
    }

    const img = `${host}/images/${imageFound.image.name}`;

    return res.status(200).json({ img });
  } catch (err) {
    console.error("Error in getAnimalImage", err);
    return res
      .status(500)
      .json({ error: "Error in getAnimalImage", err: err.message });
  }
};

const getPdf = async (req, res) => {
  const { userId } = req.params;

  console.log("user:", userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required as a param!" });
  }

  try {
    const userFound = await User.findOne({ _id: userId }).exec();
    console.log("userFound:", userFound);

    if (!userFound) {
      return res.status(404).json({ message: "User not found!" });
    }

    const pdf = userFound.pdf;

    if (pdf.length === 0) {
      return res.status(404).json({ message: "No Pdf found for this animal!" });
    }

    const pdfId = pdf[0];
    console.log("pdfId:", pdfId);

    const pdfFound = await Pdf.findOne({ _id: pdfId?._id }).exec();

    if (!pdfFound) {
      return res.status(404).json({ message: "Pdf not found!" });
    }

    const pdfLink = `${host}/images/${pdfFound.pdf.name}`;
    console.log("Pdf link: " + pdfLink);

    return res.status(200).json({ pdfLink });
  } catch (err) {
    console.error("Error in getPdf", err);
    return res.status(500).json({ error: "Error in getPdf", err: err.message });
  }
};

module.exports = {
  getPdf,
  login,
  createUser,
  getUserProfile,
  uploadImage,
  getImage,
  addAnimal,
  getAllSitters,
  getAllAnimal,
  getAnimalImage,
  getAllOwners,
  updateProfile,
  addProfilePic,
  getProfilePic,
};
