const router = require("express").Router();
const User = require("../models/User");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email } = req.body;

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res
      .status(400)
      .json({ error: "El nombre de usuario ya está en uso" });
  }

  // Verificar si el correo electrónico ya existe
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res
      .status(400)
      .json({ error: "El correo electrónico ya está en uso" });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: Crypto.AES.encrypt(
      req.body.password,
      process.env.PASSPHRASE
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ user: savedUser, message: "Usuario registrado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al registrar el usuario" });
  }
});

//LOGIN
router.get("/login", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    !user && res.status(401).json("Credenciales Incorrectas");

    const hasPassword = Crypto.AES.decrypt(
      user.password,
      process.env.PASSPHRASE
    ).toString(Crypto.enc.Utf8);

    hasPassword !== req.body.password &&
      res.status(401).json("Credenciales Incorrect");

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SCRE,
      {
        expiresIn: "3d",
      }
    );

    res.status(200).json({ ...user._doc, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
