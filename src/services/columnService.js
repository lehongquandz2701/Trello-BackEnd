/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";
import { columnModel } from "~/models/columnModel";

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

export const columnService = {
  createNew,
  update,
};
