const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  order: [
    {
      image: String,
      title: String,
      category: String,
      description: String,
      price: String,
      count: {
        type: Number,
        required: true,
        default: 1,
      },
      firstName: String,
      lastName: String,
      email: String,
      address: String,
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Seller", sellerSchema);
