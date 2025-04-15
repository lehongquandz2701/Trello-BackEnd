import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
import { ObjectId } from "mongodb";

// Define Collection (name & schema)
const USER_COLLECTION_NAME = "Users";
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(3).max(50).trim().messages({
    "any.required": "Full Name is required",
    "string.empty": "Full Name is not allowed to be empty",
    "string.max": "Full Name length limit exceeded",
    "string.min": "Full Name must be at least 3 characters",
  }),
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
  isAdmin: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
});

const createNew = async (data) => {
  try {
    const validData = await USER_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
    await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .createIndex({ email: 1 }, { unique: true });

    await checkExistingUser(validData.email);

    const createdUser = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(validData);

    return createdUser;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (error) {
    throw new Error(error);
  }
};

const checkExistingUser = async (email) => {
  const existingUser = await GET_DB()
    .collection(USER_COLLECTION_NAME)
    .findOne({
      $or: [{ email: email }],
    });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email already exists");
    }
  }
  return false;
};

export const authModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  checkExistingUser,
};
