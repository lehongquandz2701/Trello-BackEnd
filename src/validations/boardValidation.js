import Joi from "joi";

import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": "Title is required ",
      "string.empty": "Title is not allowed to be empty",
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidate = {
  createNew,
};
