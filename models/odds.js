const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oddsSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    startDate: {},
    endDate: {},
    time: { type: String },
    user: { type: Number },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Odds", oddsSchema);
