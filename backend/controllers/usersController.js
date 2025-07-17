const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get All users
// @router GET /users
// @acess private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Create users
// @router POST /users
// @acess private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password, roles, bio } = req?.body;

  //confirm the data
  if (
    !username ||
    !email ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for duplicates
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate User" });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = {
    username,
    email,
    password: hashedPassword,
    roles,
    bio,
  };

  //create and store new user
  const user = await User.create(userObject);

  if (user) {
    return res
      .status(201)
      .json({ message: `user with ${username} created successfully` });
  } else {
    return res.status(400).json({ message: "Invalid userdata received" });
  }
});

// @desc Update user
// @router PATCH /users
// @acess private
const updateUser = asyncHandler(async (req, res) => {
  console.log("Updating user:", req.params.id);
  const { id } = req.params;
  const { email, username, roles, active, password, bio } = req?.body;

  console.log(id, email, roles, active);
  //confirm the data
  if (
    !email ||
    !id ||
    typeof active !== "boolean" ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check for duplicates
  const duplicate = await User.findOne({ email }).lean().exec();

  //allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(404).json({ message: "Duplicate User name" });
  }

  if (username) {
    user.username = username;
  }
  user.roles = roles;
  user.active = active;

  if (password) {
    //hashed password
    user.password = await bcrypt.hash(password, 10);
  }

  if (bio) {
    user.bio = bio;
  }

  const updatedUser = await user.save();

  res.json({ message: `Updated user ${updatedUser?.username}` });
});

// @desc Delete user
// @router DELETE /users
// @acess private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User Id required" });
  }

  //we don't want to delete a user with notes assigned to them
  const notes = await Note.findOne({ user: id }).lean().exec();

  if (notes) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${user?.username} with id ${id} deleted`;

  res.json({ message: reply });
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
