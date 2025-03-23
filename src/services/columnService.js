/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/ApiError";

const createNew = async (reqBody) => {
  try {
    const createdColumn = await columnModel.createNew(reqBody);
    const newColumn = await columnModel.findOneById(createdColumn?.insertedId);

    if (newColumn) {
      newColumn.card = [];

      await boardModel.pushColumnOrderIds(newColumn);
    }

    return newColumn;
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedColumn = await columnModel.update(columnId, updateData);

    return updatedColumn;
  } catch (error) {
    throw error;
  }
};

const deleteColumn = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId);

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column not found!");
    }

    const result = Promise.all([
      await columnModel.deleteColumn(columnId),
      await cardModel.deleteManyByColumnId(columnId),
      await boardModel.pullColumnOrderIds(targetColumn),
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
  update,
  deleteColumn,
};
