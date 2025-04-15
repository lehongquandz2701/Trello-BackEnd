/* eslint-disable no-useless-catch */

import { authModel } from "~/models/user";
import jwt from "jsonwebtoken";
import { ENVS } from "~/config/environment";

const createNew = async (data) => {
  try {
    const created = await authModel.createNew(data);

    if (created) {
      const result = await authModel.findOneById(created.insertedId);

      if (result) {
        delete result.password;
        const accessToken = jwt.sign(
          {
            ...result,
          },
          ENVS.PRIVATE_KEY_JWT,
          {
            expiresIn: "30s",
          }
        );

        return {
          ...result,
          accessToken: accessToken,
        };
      }
    }
  } catch (error) {
    throw error;
  }
};

export const authService = {
  createNew,
};
