const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//ROUTER CONFIGURATION
const useRoute = require("./route/user");
const authRoute = require("./route/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Conectada"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server Running Port 5000");
});

app.use(express.json());
app.use(cors());

app.get("/api/", () => {
  console.log("Api corriendo...");
});

// API USER
app.use("/api/auth", authRoute);
app.use("/api/user", useRoute);
