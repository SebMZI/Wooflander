const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    roles: {
      Client: Number,
      Sitter: Number,
      Admin: Number,
    },
    sessionId: {
      type: String,
    },
    subscriptionId: {
      type: String,
    },
    isSubActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    customerId: {
      type: String,
    },
    animals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    commentary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commentary",
      },
    ],
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    pdf: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pdf",
      },
    ],
    new: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
