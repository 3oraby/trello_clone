const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [
        40,
        "A board title must have less or equal then 40 characters",
      ],
      minlength: [2, "A board title must have more or equal then 2 characters"],
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
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Board", BoardSchema);
