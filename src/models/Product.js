const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requiered: true,
      unique: true,
    },
    codeProduct: {
      type: String,
      requiered: true,
      unique: true,
    },
    color: {
      type: String,
    },
    desc: {
      type: String,
    },
    icon: {
      type: String,
    },
    codeIcon: {
      type: String,
      required: true,
      unique: true,
    },
    categories: {
      type: String,
      requiered: true,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      requiered: true,
    },
    launchDate: {
      type: Date,
    },
    stock: {
      type: Number,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
