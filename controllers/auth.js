const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const userResult = await user.save();

    res.status(201).json({
      message: "User created successfully",
      result: userResult,
    });
  } catch (err) {
    res.status(500).json({
      message: "This email already exists!",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    let user;
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: "You are not registered. Please signup first!",
      });
    }
    isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email/password credentials",
      });
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: user._id,
      surveyStatus: user.surveyStatus,
      userName: user.name,
    });
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};
