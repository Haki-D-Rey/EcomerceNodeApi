const Crypto = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getLoginUserService = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json("Credenciales Incorrectas");
    }

    const hasPassword = Crypto.AES.decrypt(
      user.password,
      process.env.PASSPHRASE
    ).toString(Crypto.enc.Utf8);

    if (hasPassword !== password) {
      return res.status(401).json("Credenciales Incorrectas");
    }

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
    return res.status(200).json({ ...user._doc, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

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
    username: username,
    email: email,
    password: Crypto.AES.encrypt(password, process.env.PASSPHRASE).toString(),
  });

  try {
    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ user: savedUser, message: "Usuario registrado exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al registrar el usuario" });
  }
};

module.exports = { getLoginUserService, postRegisterUser };
