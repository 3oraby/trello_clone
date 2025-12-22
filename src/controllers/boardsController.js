const handlerFactory = require("./handlerFactory");
const Board = require("../models/boardModel");

exports.getAllBoards = handlerFactory.getAll(Board);
exports.createBoard = handlerFactory.createOne(Board);
exports.getBoard = handlerFactory.getOne(Board);
exports.updateBoard = handlerFactory.updateOne(Board);
exports.deleteBoard = handlerFactory.deleteOne(Board);
