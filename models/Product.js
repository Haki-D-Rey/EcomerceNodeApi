const mongoose = requiere("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requiered: true,
      unique: true,
    },
    desc: {
      type: String,
      requiered: true,
    },
    image: {
      type: String,
      requiered: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
