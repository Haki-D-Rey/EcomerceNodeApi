const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("user test sucessfull");
});

router.post("/userpost", (req, res) => {
  const username = req.body.username;
  res.send(`el usuario ingresado es = ${username}`);
});

module.exports = router;
