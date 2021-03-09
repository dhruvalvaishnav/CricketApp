import mongoose from "mongoose";

const cricketerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    Born: {
      type: String,
      required: true,
    },
    Age: {
      type: String,
      required: true,
    },
    Team: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
    },
    Batting: {
      type: String,
      required: true,
    },
    Bowling: {
      type: String,
      required: true,
    },
    ODI_100_50: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Cricketer = mongoose.model("Cricketer", cricketerSchema);

export default Cricketer;
