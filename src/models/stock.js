const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ticker: {
      type: String,
      required: true,
      uppercase: true,
    },
    buyingDate: {
      type: Date,
      required: true,
    },
    buyingPrice: {
      type: Number,
      required: true,
    },
    buyingQuantity: {
      type: Number,
      required: true,
    },
    stoploss: {
      type: Number,
    },
    sellingDate: {
      type: Date,
    },
    sellingPrice: {
      type: Number,
    },
    sellingQuantity: {
      type: Number,
    },
    remainingQuantity: {
      type: Number,
    },
    netResult: {
      type: Number,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
