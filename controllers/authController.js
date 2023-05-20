const User = require("../models/userModel.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");
const ApplicationError = require("../utils/ApplicationError.js");
const {
  authTokenCreation,
  authTokenVerification,
} = require("../utils/verifyToken.js");

//sign Up:
const signUp = catchErrorAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json({
    status: "successful register",
    newUser,
  });
});

//login

const login = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApplicationError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new ApplicationError("Incorrect credentials", 401));
  }

  //create token:
  const token = authTokenCreation(user._id);
  res.cookie("jwt", token, {
    expire: new Date(
      Date.now() + parseInt(process.env.JWT_EXPIRY) * 24 * 60 * 60 * 1000
    ),
  });

  res.status(200).json({
    status: "successful login",
    token,
  });
});

//protect:

const protect = catchErrorAsync(async (req, res, next) => {
  let token = "";
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApplicationError("Not authorized", 401)); //401 means not authorised
  }
  const payload = await authTokenVerification(token);

  const userInfo = await User.findById(payload.id);

  if (!userInfo) {
    return next(new ApplicationError("The user does not exist", 401));
  }
  if (userInfo.invalidateTokens(payload.iat)) {
    return next(new ApplicationError("Login again", 401));
  }
  req.user = userInfo;
  next();
});

module.exports = { signUp, login, protect };
