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
    bloodGroup: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    medicals: [
      {
        date: {
          type: Date,
        },
        diagnosis: {
          type: String,
        },
        prescription: {
          type: String,
        },
      },
    ],
    comments: {
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
