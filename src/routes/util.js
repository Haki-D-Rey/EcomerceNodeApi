const router = require("express").Router();
const { verifyToken } = require("../helper/middleware/verifyToken");

const { uploadFile } = require("../helper/utils/S3");

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "get images" });
});

router.post("/image/upload", async (req, res) => {
  const result = await uploadFile(req.files["photo"]);
  console.log(result);
  if (!result.fieldError) {
    return res.status(201).json({ url: result.url, message: "upload image" });
  }
  return res.status(400).json({ message: "Error upload image" });
});

module.exports = router;
