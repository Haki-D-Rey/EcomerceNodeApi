const router = require("express").Router();
const Product = require("../models/Product");
const {
  verifyTokenAutorizationAdminUser,
  verifyToken,
} = require("../helper/middleware/verifyToken");

const { validateRequiredFields } = require("../helper/middleware/validateBody");

const {
  getProductAllController,
  getProductController,
  postProductController,
  putProductContoller,
  deleteProductController,
} = require("../controllers/product");

// GET PRODUCT ALL
router.get("/", getProductAllController);

//GET PRODUCT SPECIFIC
router.get("/:id", getProductController);

//CREATE PRODUCT
router.post("/", verifyTokenAutorizationAdminUser, postProductController);

//UPDATE PRODUCT
router.put(
  "/:id",
  verifyTokenAutorizationAdminUser,
  validateRequiredFields(Product),
  putProductContoller
);

//DELETE PRODUCT
router.delete(
  "/:id",
  verifyTokenAutorizationAdminUser,
  deleteProductController
);

module.exports = router;
