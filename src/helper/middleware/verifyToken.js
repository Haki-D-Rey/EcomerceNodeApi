const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headerAuth = req.headers.authorization || "";

  if (!headerAuth) {
    return res.status(405).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SCRE, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
