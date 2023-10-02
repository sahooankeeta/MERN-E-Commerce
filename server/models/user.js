const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: [true,'User email {VALUE} already exists'],
      lowercase: true,
      validate: [validator.isEmail, "please provide valid email"],
    },
    name: {
      type: String,
      required: [true,'please provide name'],
    },
    company:{
      type: String,
      unique:[true,'Company {VALUE} already exists'],
    },
    password: {
      type: String,
      minLength: [6,'Password should be at least 6 characters'],
      required: [true,'please provide password'],
    },
    userType: {
      type: String,
      enum:{
        values: ['buyer','seller','admin'],
        message: '{VALUE} is not supported'
      },
      default:'buyer'
    },
    bag:[{
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity:{
        type:Number,
        default:1
      }
    }],
    productOrders:[]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;