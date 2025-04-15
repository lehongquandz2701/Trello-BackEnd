import { StatusCodes } from "http-status-codes";
import { authModel } from "~/models/user";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    const users = authModel.USER_COLLECTION_SCHEMA;
    await users.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const errorMessages = error.details
      ? error.details.map((detail) => detail.message).join(", ")
      : error.message;

    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessages));
  }
};

export const authValidate = {
  createNew,
};
