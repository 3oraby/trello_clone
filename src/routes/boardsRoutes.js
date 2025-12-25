const express = require("express");

const router = express.Router();
const {
  getAllBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  setBoardUserIds,
} = require("../controllers/boardsController");

const { protect, restrictTo } = require("../controllers/authController");

router.use(protect);
router.route("/").get(getAllBoards).post(setBoardUserIds, createBoard);
router
  .route("/:id")
  .get(getBoard)
  .patch(restrictTo("admin"), updateBoard)
  .delete(restrictTo("admin"), deleteBoard);

module.exports = router;
