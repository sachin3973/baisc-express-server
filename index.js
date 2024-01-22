const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

// HANDLERS

// Get all users
const getAllUser = (req, res) => {
  return res.status(200).json(users);
};

// Create a user
const createUser = (req, res) => {
  const user = req.body;
  const id = users.length + 1;
  user.id = id;
  users.push({ ...user });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  });

  return res.status(201).json({
    message: "User created successfully",
    id: id,
  });
};

// Get a user by id
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.status(200).json(user);
};

// Update a user by id
const updateUserById = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  users[userIndex] = { ...users[userIndex], ...req.body };
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      user: users[userIndex],
    });
  });
};

// Delete a user by id
const deleteUserById = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  users.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      message: "User deleted successfully",
    });
  });
};

// ROUTES

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to our API");
});

// If request is coming from browser
app.get("/users", (req, res) => {
  const html = `
    <ol>
      ${users
        .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
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
