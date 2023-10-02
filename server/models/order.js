const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    razorpayOrderId:{
        type:String,
        required: true,
    },
    razorpayPaymentId:{
        type:String,
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        product_name:{
            type:String,
            required:true
        },
        product_price:{
            type:Number,
            required:true
        },
        product_image:{
            type:String,
            required:true
        },
        company_name:{
            type:String,
            required:true
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
    },
    itemCount: {
        type: Number,
        required: true,
        default: 0
    },
    address:{
        type:Object,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;