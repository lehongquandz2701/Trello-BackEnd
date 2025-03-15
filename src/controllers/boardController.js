import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    console.log("  req.body", req.body);

    // next();
    res.status(StatusCodes.OK).json({
      message: "api create list board",
    });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
