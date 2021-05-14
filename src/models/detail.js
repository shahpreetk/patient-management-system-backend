const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    caseNumber: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    date1: {
      type: Date,
      required: true,
    },
    diagnosis1: {
      type: String,
      required: true,
    },
    prescription1: {
      type: String,
      required: true,
    },
    date2: {
      type: Date,
    },
    diagnosis2: {
      type: String,
    },
    prescription2: {
      type: String,
    },
    date3: {
      type: Date,
    },
    diagnosis3: {
      type: String,
    },
    prescription3: {
      type: String,
    },
    comments: {
      type: String,
    },
    gender: {
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

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;
