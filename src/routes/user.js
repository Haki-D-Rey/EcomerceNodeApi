const router = require("express").Router();
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

//GET ALL USERS
router.get("/", verifyToken, getUserAllController);

//GET USER FOR ID
router.get("/:id", verifyToken, getUserIdController);

//CREATE USER
router.post("/", verifyToken, postUserController);

//UPDATE USER
router.put("/:id", verifyTokenAutorizationAdminUser, putUserController);

//DELETE USER
router.delete("/:id", verifyTokenAutorizationAdminUser, deleteUserController);

module.exports = router;
