import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { authModel } from "~/models/user";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    await authModel.USER_COLLECTION_SCHEMA.validateAsync(req.body, {
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

const login = async (req, res, next) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .messages({
          "any.required": "Email is required",
          "string.empty": "Email is not allowed to be empty",
          "string.email": "Email must be a valid email address",
        }),

      password: Joi.string()
        .required()
        .min(8)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .messages({
          "any.required": "Password is required",
          "string.empty": "Password is not allowed to be empty",
          "string.min": "Password must be at least 8 characters",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }),
    });

    await loginSchema.validateAsync(req.body, {
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
  login,
};
