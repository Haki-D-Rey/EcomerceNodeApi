const User = require("../models/User");
const { postRegisterUser } = require("./auth");
const { validateFieldExistent } = require("../helper/utils/validateField");
const Crypto = require("crypto-js");

const getUserALlService = async (req, res) => {
  try {
    const query = req.query.new;
    const userAll = query
      ? await User.find().sort({ id: -1 }).limit(5)
      : await User.find({});
    return res.json(userAll);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const getUserIdService = async (req, res) => {
  try {
    const userAll = await User.findById(req.params.id);
    return res.json(userAll);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el usuario especificado" });
  }
};

const postUserService = async (req, res) => {
  try {
    return await postRegisterUser(req, res);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear Usuario" });
  }
};

const putUserService = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = Crypto.AES.encrypt(
        req.body.password,
        process.env.PASSPHRASE
      ).toString();
    }

    const body = req.body;
    const fieldNotExclude = ["username", "email"];

    //VALIDATE FIELD REPETIDED ESPECIFIC
    const validate = await validateFieldExistent(
      User,
      body,
      fieldNotExclude,
      req.user.id
    );
    if (validate.fieldError) {
      return res.status(400).json({ error: validate.error });
    }

    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: body,
      },
      {
        new: true,
      }
    );
    return res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

const deleteUserService = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Usuario Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getUserALlService,
  getUserIdService,
  postUserService,
  putUserService,
  deleteUserService,
};
