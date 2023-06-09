const Product = require("../models/Product");

const {
  generateUniqueCode,
  validateCreateProductExistent,
  validateUpdateProductExistent,
} = require("../helper/utils/validateField");

const getProductAllServices = async (req, res) => {
  try {
    const query = req.query.new;
    const productAll = query
      ? await Product.find().sort({ id: -1 }).limit(5)
      : await Product.find({});
    return res.json(productAll);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los Productos" });
  }
};

const getProductServices = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el producto especificado" });
  }
};

const postProductService = async (req, res) => {
  try {
    const response = await validateCreateProductExistent(Product, req);

    if (response.fieldError) {
      return res.status(400).json({ error: response.error });
    }

    if (!req.body.stock) {
      return res.status(400).json({ error: "El campo stock es Requerido" });
    }

    const detailProduct = {
      ...req.body,
      codeProduct: response.value,
      codeIcon: `img-${generateUniqueCode()}`,
      launchDate: !req.body.launchDate
        ? new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        : req.body.launchDate,
    };
    const newProduct = new Product(detailProduct);
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      data: savedProduct,
      message: "Se ha agregado el producto satisfactoriamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al agrergar el productos",
      details: error.message,
    });
  }
};

const putProductService = async (req, res) => {
  const response = await validateUpdateProductExistent(Product, req);

  if (response.fieldError) {
    return res.status(400).json({ error: response.error });
  }

  try {
    const body = req.body;
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: body,
      },
      {
        new: true,
      }
    );
    return res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el Producto" });
  }
};

const deleteProductService = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Producto Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const putUpdateStockProductService = async (req, res) => {
  try {
    let arrayResponse = [];
    const body = req.body;
    for (const item of body) {
      let product = await Product.findById(item.id);
      if (item.stock > product.stock || item.stock <= 0) {
        arrayResponse.push({
          id: item.id,
          stock: product.stock,
          isModified: false,
        });
        continue;
      }
      product.stock -= item.stock;
      await Product.findByIdAndUpdate(
        item.id,
        { stock: product.stock },
        { new: true }
      );

      arrayResponse.push({
        id: item.id,
        stock: product.stock,
        isModified: true,
      });
    }

    return res
      .status(200)
      .json({ data: arrayResponse, message: "Stock Actualizado" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getProductAllServices,
  getProductServices,
  postProductService,
  putProductService,
  deleteProductService,
  putUpdateStockProductService,
};
