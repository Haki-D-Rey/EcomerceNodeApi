const router = require("express").Router();
const {
  getLoginController,
  postRegisterController,
} = require("../controllers/auth");

//ROUTER AUTH
router.get("/login", getLoginController);
router.post("/register", postRegisterController);

module.exports = router;
