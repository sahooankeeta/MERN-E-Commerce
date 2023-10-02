const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;