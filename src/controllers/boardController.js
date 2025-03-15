import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    console.log("  req.body", req.body);

    // next();
    res.status(StatusCodes.OK).json({
      message: "api create list board",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message,
    });
  }
};

export const boardController = {
  createNew,
};
