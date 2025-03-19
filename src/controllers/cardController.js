import { StatusCodes } from "http-status-codes";
import { cardService } from "~/services/cardService";

const createNew = async (req, res, next) => {
  try {
    const createdCard = await cardService.createNew(req.body);
    res.status(StatusCodes.OK).json(createdCard);
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  createNew,
};
