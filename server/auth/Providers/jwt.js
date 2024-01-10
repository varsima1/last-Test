const jwt = require("jsonwebtoken");

const dotenv = require('dotenv')
dotenv.config()

const key = process.env.JWT_KEY;

const generateAuthToken = (user) => {
  const { _id, isSeller, isAdmin } = user;
  const token = jwt.sign({ _id, isSeller, isAdmin }, key);
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, key);
    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
