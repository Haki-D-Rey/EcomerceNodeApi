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
      type: String,
      requiered: true,
    },
    launchDate: {
      type: Date,
    },
    stock: {
      type: Number,
      requiered: true,
    },
    description: {
      type: String,
    },
    details: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
