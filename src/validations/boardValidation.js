import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().messages({
      "any.required": "Title is required ",
      "string.empty": "Title is not allowed to be empty",
      "string.max": "Title length limit exceeded",
      "string.min": "Title must be at least 3 characters",
    }),
    description: Joi.string().required().min(3).max(256).trim().messages({
      "any.required": "Description is required",
      "string.empty": "Description is not allowed to be empty",
      "string.max": "Description length limit exceeded",
      "string.min": "Description must be at least 3 characters",
    }),
    type: Joi.string().valid("public", "private").required(),
  });

  try {
    await correctCondition.validateAsync(req.body, {
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

export const boardValidate = {
  createNew,
};
