const {
  getProductAllServices,
  getProductServices,
  postProductService,
  putProductService,
  deleteProductService,
  putUpdateStockProductService,
} = require("../services/product");

const getProductAllController = (req, res) => getProductAllServices(req, res);

const getProductController = (req, res) => getProductServices(req, res);

const postProductController = (req, res) => postProductService(req, res);

const putProductContoller = (req, res) => putProductService(req, res);

const deleteProductController = (req, res) => deleteProductService(req, res);

const putUpdateStockProductController = (req, res) =>
  putUpdateStockProductService(req, res);

module.exports = {
  getProductAllController,
  getProductController,
  postProductController,
  putProductContoller,
  deleteProductController,
  putUpdateStockProductController,
};
