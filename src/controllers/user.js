const {
  getUserALlService,
  getUserIdService,
  postUserService,
  putUserService,
  deleteUserService,
} = require("../services/user");

const getUserAllController = (req, res) => {
  return getUserALlService(req, res);
};

const getUserIdController = (req, res) => {
  return getUserIdService(req, res);
};

const postUserController = (req, res) => {
  return postUserService(req, res);
};

const putUserController = (req, res) => {
  return putUserService(req, res);
};

const deleteUserController = (req, res) => {
  return deleteUserService(req, res);
};

module.exports = {
  getUserAllController,
  getUserIdController,
  postUserController,
  putUserController,
  deleteUserController,
};
