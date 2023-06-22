const router = require("express").Router();
const User = require("../models/User");
const {
  verifyTokenAutorizationAdminUser,
  verifyToken,
} = require("../helper/middleware/verifyToken");

const {
  getUserAllController,
  getUserIdController,
  postUserController,
  putUserController,
  deleteUserController,
} = require("../controllers/user");

const { validateRequiredFields } = require("../helper/middleware/validateBody");

//GET ALL USERS
router.get("/", verifyToken, getUserAllController);

//GET USER FOR ID
router.get("/:id", verifyToken, getUserIdController);

//CREATE USER
router.post("/", verifyToken, postUserController);

//UPDATE USER
router.put(
  "/:id",
  verifyTokenAutorizationAdminUser,
  validateRequiredFields(User),
  putUserController
);

//DELETE USER
router.delete("/:id", verifyTokenAutorizationAdminUser, deleteUserController);

module.exports = router;
