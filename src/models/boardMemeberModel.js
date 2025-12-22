const mongoose = require("mongoose");

const boardMemberSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "member"],
        message: "Role must be admin or member",
      },
      default: "member",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

boardMemberSchema.index({ userId: 1, boardId: 1 }, { unique: true });

module.exports = mongoose.model("BoardMember", boardMemberSchema);
