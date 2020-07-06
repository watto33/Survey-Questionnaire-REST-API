const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userData.userId });
    if (user.surveyStatus) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }
    req.userData.surveyStatus = user.surveyStatus;
    next();
  } catch (err) {
    console.log(err);
  }
};
