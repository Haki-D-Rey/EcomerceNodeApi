const validateFieldSchema = (model, arrayField, body) => {
  arrayField.forEach((field) => {
    if (model.schema.path(field).isRequired && !body[field]) {
      return res.status(400).json({ error: `El campo ${field} es requerido` });
    }
  });
};

const validateFieldExistent = async (
  model,
  body,
  fieldNotExcludeValidate,
  User
) => {
  const userInfo = await model.findById(User.id);
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

module.exports = { validateFieldSchema, validateFieldExistent };
