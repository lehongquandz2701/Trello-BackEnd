/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { ENVS } from "~/config/environment";

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack,
  };

  if (ENVS.BUILD_MODE !== "dev") delete responseError.stack;

  res.status(responseError.statusCode).json(responseError);
};
