const mongoose = requiere("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      requiered: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      requiered: true,
    },
    address: {
      type: Object,
      requiered: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
