const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:[true,'Product name required']
    },
    price:{
        type:Number,
        required:[true,'Product price required']
    },
    stock:Number,
    orders:Number,
    description:{
        type:String,
        required:[true,'Product description required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    images:[] 
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;