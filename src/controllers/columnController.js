import { StatusCodes } from "http-status-codes";
import { columnService } from "~/services/columnService";

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await columnService.createNew(req.body);
    res.status(StatusCodes.OK).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updatedBoard = await columnService.update(columnId, req.body);

    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

const deleteColumn = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updatedBoard = await columnService.deleteColumn(columnId);

    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createNew,
  update,
  deleteColumn,
};
