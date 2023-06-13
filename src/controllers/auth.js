const { getLoginUserService, postRegisterUser } = require("../services/auth");

const getLoginController = async (req, res) => {
  return await getLoginUserService(req, res);
};

const postRegisterController = async (req, res) => {
  return await postRegisterUser(req, res);
};

module.exports = { getLoginController, postRegisterController };
