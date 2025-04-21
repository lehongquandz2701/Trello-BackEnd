/* eslint-disable no-useless-catch */

import { authModel } from "~/models/user";
import jwt from "jsonwebtoken";
import { ENVS } from "~/config/environment";

const createNew = async (data) => {
  try {
    const created = await authModel.createUserFb(data);

    if (created) {
      const result = await authModel.findOneById(created.insertedId);

      if (result) {
        delete result.password;

        return result;
        // remove custom jwt token switch firebase token
        // const { accessToken, refreshToken } = generateTokens(result);

        // return {
        //   ...result,
        //   accessToken: accessToken,
        //   refreshToken: refreshToken,
        // };
      }
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    return await authModel.signIn(data);
  } catch (error) {
    throw error;
  }
};

const generateTokens = (data) => {
  const accessToken = jwt.sign(data, ENVS.PRIVATE_KEY_JWT, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(data, ENVS.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const authService = {
  createNew,
  login,
};
