import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().messages({
      "any.required": "Title is required ",
      "string.empty": "Title is not allowed to be empty",
      "string.max": "Title length limit exceeded",
      "string.min": "Title must be at least 3 characters",
    }),
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
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

export const cardValidate = {
  createNew,
};
