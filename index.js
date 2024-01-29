const express = require("express");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const { connectMongoDb } = require("./connection.js");
const { logRequest } = require("./middlewares");

const app = express();
const PORT = 8000;

// DATABASE CONNECTION
connectMongoDb("mongodb://localhost:27017/express-mongo").then(() => {
  console.log("Connected to MongoDB");
});

// MIDDLEWARES
app.use(logRequest("log.txt"));
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/users", userRouter);

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
