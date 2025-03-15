/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";

const createNew = async (reqBody) => {
  try {
    const createdBoard = await boardModel.createNew(reqBody);
    // const getNewBoard = await boardModel.findOneById(createdBoard?.insertedId);
    // return getNewBoard;
    return {
      title: "okekoekoek",
      description: "pokaskdokasodk",
    };
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
};
