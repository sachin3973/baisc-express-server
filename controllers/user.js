const User = require("../models/user.js");

// HANDLERS

// Get all users
const getAllUser = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.status(200).json(allDbUsers);
};

// Create a user
const createUser = async (req, res) => {
  const user = req.body;
  if (!user.firstName || !user.email) {
    return res.status(400).json({
      message: "First name and email are required",
    });
  }
  const result = await User.create(user);
  return res.status(201).json({
    message: "User created successfully",
  });
};

// Get a user by id
const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json(user);
};

// Update a user by id
const updateUserById = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Bad request",
    });
  }
};

// Delete a user by id
const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Bad request",
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
