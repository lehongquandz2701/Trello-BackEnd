import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { WHITELIST_DOMAINS } from "~/utils/constants";
import { ENVS } from "./environment";

export const corsOptions = {
  origin: function (origin, callback) {
    if (ENVS.BUILD_MODE === "dev") {
      return callback(null, true);
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS Policy.`
      )
    );
  },

  optionsSuccessStatus: 200,

  credentials: true,
};
