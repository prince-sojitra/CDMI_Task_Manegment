const userModel = require("../Models/userModel");
const { createRandomHexColor } = require("./helperMethods");

const adminRegister = async (user, callback) => {
  const newUser = userModel({ ...user, type: "ADMIN",color:createRandomHexColor()});
  await newUser
    .save()
    .then((result) => {
      return callback(false, { message: "User created successfuly!" });
    })
    .catch((err) => {
      return callback({ message: "Email already in use!", details: err });
    });
};

const register = async (user, callback) => {
  const newUser = userModel({ ...user, color:createRandomHexColor()});
  await newUser
    .save()
    .then((result) => {
      return callback(false, { message: "User created successfuly!" });
    })
    .catch((err) => {
      return callback({ message: "Email already in use!", details: err });
    });
};

const login = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email, status: true });
    if (!user) return callback({ message: "Your email/password is wrong!" });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      message: "Something went wrong",
      details: err.message,
    });
  }
};

const getUser = async (id, callback) => {
  try {
    let user = await userModel.findById(id);
    if (!user) return callback({ message: "User not found!" });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      message: "Something went wrong",
      details: err.message,
    });
  }
};

const getUserWithMail = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return callback({
        message: "There is no registered user with this e-mail.",
      });
    return callback(false, { ...user.toJSON() });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

module.exports = {
  adminRegister,
  register,
  login,
  getUser,
  getUserWithMail,
};
