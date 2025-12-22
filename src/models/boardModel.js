const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [
        40,
        "A board name must have less or equal then 40 characters",
      ],
      minlength: [2, "A board name must have more or equal then 2 characters"],
    },
    description: {
      type: String,
      trim: true,
      nullable: true,
      maxlength: [
        200,
        "A board description must have less or equal then 200 characters",
      ],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", BoardSchema);
