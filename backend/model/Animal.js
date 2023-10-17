const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  proprio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  numVeterinaire: {
    type: String,
    required: true,
  },
  numProprio: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  entente: {
    type: Boolean,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  caractere: [
    {
      type: String,
    },
  ],
  image: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

module.exports = mongoose.model("Animal", animalSchema);
