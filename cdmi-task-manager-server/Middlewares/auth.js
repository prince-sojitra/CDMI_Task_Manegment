const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
  return token.toString();
};

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res
        .status(401)
        .send({ message: "Authorization token not found!" });

    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    await jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      if (err)
        return res
          .status(401)
          .send({ message: "Authorization token invalid", details: err });
      const user = await userModel.findById(verifiedToken.id);
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        errMesage: "Internal server error occured!",
        details: error.message,
      });
  }
};

const verifyAdminToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new Error("Authorization token not found!")
    }

    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(verifiedToken.id);
    if (!user || user.type != "ADMIN") {
      throw new Error("You are not ADMIN!")
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({
        status: "fail",
        message: error.message,
      });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  verifyAdminToken
};
