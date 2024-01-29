const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// DATABASE CONNECTION
mongoose
  .connect("mongodb://localhost:27017/basic-express-app")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Mongo Error:", err));

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

// SCHEMA
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

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

  console.log("Result:", result);

  return res.status(201).json({
    message: "User created successfully",
  });
};

// Get a user by id
const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
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

// ROUTES

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to our API");
});

// If request is coming from browser
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ol>
      ${allDbUsers
        .map(
          (user) =>
            `<li>${user.firstName} ${user?.lastName} | ${user.email}</li>`
        )
        .join("")}
    </ol>
  `;
  res.send(html);
});

app.route("/api/users").get(getAllUser).post(createUser);

app
  .route("/api/users/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

app.post("/api/users", createUser);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
