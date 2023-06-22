const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const { router } = require("./routes");
const fileUploadImage = require("express-fileupload");

app.use(
  fileUploadImage({
    useTempFiles: true,
    tempFileDir: "./assets/",
  })
);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Conectada"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://smartcell-ecommerce-website.s3-website-us-east-1.amazonaws.com",
    ],
  })
);
app.use("/v1", router);

app.listen(process.env.PORT, () => {
  console.log("Server Running Port 5000");
});
