const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.js");

router.route("/").get(getAllUser).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
