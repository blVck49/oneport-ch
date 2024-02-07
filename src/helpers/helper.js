const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createValidator} = require("express-joi-validation")

exports.validator = createValidator();

const response = ({ res, status, code, message, data }) => {
  return res.status(code).json({
      status,
      message,
      data
  });
};

exports.success = (res, code, data) => {
  return response({ res, status: true, code, message: "Success!", data });
};

exports.error = (res, code, err, data) => {
  return response({ res, status: false, code, data, message: err.message || err });
};

exports.setup_token = async (user) => {
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
      exp: Date.now() + 600000,
    },
    `${process.env.JWT_SECRET}`
  );
  return token;
};

exports.hash = async (password) => {
  const hashed_password = await bcrypt.hash(password, 12);
  return hashed_password;
};

exports.verify_hash = async (password, hashed_password) => {
  const verify_password = await bcrypt.compare(password, hashed_password);
  return verify_password;
};
