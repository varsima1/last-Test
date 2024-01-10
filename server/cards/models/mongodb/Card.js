const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");
const { DEFAULT_VALIDATION, URL } = require("../../helpers/mongooseValidators");

const cardSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String, // Specify the type for currency as String
    required: true,
  },
  description: {
    ...DEFAULT_VALIDATION,
    maxLength: 1024,
  },
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  web: URL,
  image: Image,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;