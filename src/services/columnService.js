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

export const columnService = {
  createNew,
};
