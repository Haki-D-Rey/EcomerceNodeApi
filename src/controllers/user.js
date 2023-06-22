const {
  getUserALlService,
  getUserIdService,
  postUserService,
  putUserService,
  deleteUserService,
} = require("../services/user");

const getUserAllController = (req, res) => getUserALlService(req, res);

const getUserIdController = (req, res) => getUserIdService(req, res);

const postUserController = (req, res) => postUserService(req, res);

const putUserController = (req, res) => putUserService(req, res);

const deleteUserController = (req, res) => deleteUserService(req, res);

module.exports = {
  getUserAllController,
  getUserIdController,
  postUserController,
  putUserController,
  deleteUserController,
};
