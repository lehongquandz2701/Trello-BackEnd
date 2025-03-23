/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
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

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedBoard = await boardModel.update(boardId, updateData);

    return updatedBoard;
  } catch (error) {
    throw error;
  }
};

const arrangeCardsColumn = async (reqBody) => {
  try {
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId,
    });

    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now(),
    });

    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now(),
    });

    return {
      status: "successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetail,
  update,
  arrangeCardsColumn,
};
