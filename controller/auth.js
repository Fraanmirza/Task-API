const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { createCustomError } = require("../errors/custom-error");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    // Generate token
    const token = user.createJWT();

    res.json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check email and password from request password
    if (!email || !password) {
      return next(createCustomError("please provide email and password", 401));
    }

    //find user in database
    const user = await User.findOne({ email });

    if (!user) {
      return next(createCustomError("Invalid credentials", 401));
    }

    //campare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return next(createCustomError("Invalid credentials", 401));
    }

    //jenerate token for user
    const token = user.createJWT();

    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register, login };
