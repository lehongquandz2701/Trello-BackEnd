/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";

const createNew = async (reqBody) => {
  try {
    const createdBoard = await boardModel.createNew(reqBody);
    const getNewBoard = await boardModel.findOneById(createdBoard?.insertedId);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetail = async (boardId) => {
  try {
    const board = await boardModel.getDetail(boardId);
    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");

    const newBoard = cloneDeep(board);

    newBoard.columns.forEach(
      (column) =>
        (column.cards = newBoard.cards.filter(
          (card) => card.columnId.toString() === column._id.toString()
        ))
    );

    delete newBoard.cards;

    return newBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetail,
};
