// Middleware para validar campos requeridos
const validateRequiredFields = (model) => {
  return (req, res, next) => {
    const missingFields = [];

    const keys = Object.keys(model.schema.paths);
    const bodyKeys = Object.keys(req.body);

    keys.forEach((key) => {
      if (model.schema.paths[key].isRequired && !bodyKeys.includes(key)) {
        missingFields.push(key);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Faltan los siguientes campos requeridos: ${missingFields.join(
          ", "
        )}`,
      });
    }
    next();
  };
};

module.exports = { validateRequiredFields };
