const { logger } = require("../helpers/logger");
const { success, error, hash, verify_hash, setup_token } = require("../helpers/helper");

const User = require("../models/user");

exports.create = async (req, res) => {
  logger.debug("Creating a new user");
  try {
    const data = req.body
    const password = await hash(data.password)
    const user = await User.create({
      ...data,
      password,
    });
    await user.save();
    Reflect.deleteProperty(user._doc, "password");
    return success(res, 201, user);
  } catch (err) {
    logger.error("🔥 error: %o", err);
    return error(res, 500, err);
  }
};

exports.login = async (req, res) => {
    logger.debug("Logging in");
    try{
      let user = res.locals.user
      const { password } = req.body
      const valid_password = await verify_hash(
      password,
      user.password
      );
      if (!valid_password) throw new Error ("Wrong Email or Password")
      const token = await setup_token(user);
      user = await User.findByIdAndUpdate(user.id, {token}, {new: true})
      Reflect.deleteProperty(user._doc, "password");
      return success(res, 201, user);
    }catch (err) {
      logger.error("🔥 error: %o", err);
      return error(res, 500, err);
    }
  };

exports.currentUser = async (data) => {
  logger.debug("Getting current user...");
  try {
    const user = await getUser(data);
    return {
      error: false,
      message: "user retrieved successfully",
      data: user,
    };
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return {
      error: true,
      message: "something went wrong, could not get user",
    };
  }
};

const getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};
