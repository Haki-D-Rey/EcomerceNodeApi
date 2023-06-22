const validateFieldExistent = async (
  model,
  body,
  fieldNotExcludeValidate,
  id
) => {
  const userInfo = await model.findById(id);
  const keys = Object.keys(body);

  for (const field of keys) {
    if (
      model.schema.path(field).options.requiered &&
      fieldNotExcludeValidate.includes(field) &&
      userInfo[field] !== body[field]
    ) {
      const response = await model.findOne({ [field]: body[field] });
      if (response) {
        return {
          error: `El campo '${[field]}' ya está en uso`,
          fieldError: true,
        };
      }
    }
  }
  return { fieldError: false, error: "" };
};

const generateUniqueCode = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString().slice(2, 8);
  return `${timestamp}${random}`;
};

const validateCreateProductExistent = async (Product, req) => {
  const categoriesCode = !req.body.codeProduct
    ? `prod-${req.body.categories}-${generateUniqueCode()}`
    : req.body.codeProduct;

  const ProductExistent = await Product.findOne({
    codeProduct: categoriesCode,
  });

  if (ProductExistent) {
    return { fieldError: true, error: "Este producto ya existe" };
  }
  return { value: categoriesCode, fieldError: false, error: "" };
};

const validateUpdateProductExistent = async (Product, req) => {
  const codeProduct = await Product.findOne({
    codeProduct: req.body.codeProduct,
  });
  const codeIcon = await Product.findOne({ codeIcon: req.body.codeIcon });

  if (codeProduct && codeProduct.id !== req.params.id) {
    return { fieldError: true, error: "El codigo del producto ya existe" };
  }

  if (codeIcon && codeIcon.id !== req.params.id) {
    return { fieldError: true, error: "El codigo de la imagen ya existe" };
  }
  return { fieldError: false, error: "" };
};

module.exports = {
  validateFieldExistent,
  generateUniqueCode,
  validateCreateProductExistent,
  validateUpdateProductExistent,
};
