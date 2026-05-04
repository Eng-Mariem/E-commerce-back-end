const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const isValidImage = (value) => {
  if (!value) {
    return true;
  }

  return /\.(jpg|jpeg|png|webp)$/i.test(value);
};

const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profilePicture: user.profilePicture,
});

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, profilePicture } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (!isValidImage(profilePicture)) {
      return res.status(400).json({
        success: false,
        message: "Profile picture must be jpg, jpeg, png, or webp",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      profilePicture,
    });
    const token = generateToken(user._id);

    res.status(201).json({ success: true, user: userResponse(user), token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ success: true, user: userResponse(user), token });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, profilePicture } = req.body;

    if (!isValidImage(profilePicture)) {
      return res.status(400).json({
        success: false,
        message: "Profile picture must be jpg, jpeg, png, or webp",
      });
    }

    const user = await User.findById(req.user._id);

    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePicture =
      profilePicture !== undefined ? profilePicture : user.profilePicture;

    const updatedUser = await user.save();

    res.status(200).json({ success: true, user: userResponse(updatedUser) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
