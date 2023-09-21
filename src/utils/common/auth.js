const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
}

function createToken(input) {
  try {
    const token = jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
    return token;
  } catch (error) {
    throw error;
  }
}

function verifyToken(token) {
  try {
    const response = jwt.verify(token, ServerConfig.JWT_SECRET);
    console.log("verifyToken response printing", response);
    return response;
  } catch (error) {
    console.log("verifyToken error printing", error);
    throw error;
  }
}

module.exports = { checkPassword, createToken, verifyToken };
