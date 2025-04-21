import { StatusCodes } from "http-status-codes";
import { authService } from "~/services/authService";

const register = async (req, res, next) => {
  try {
    const user = await authService.createNew(req.body);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const idToken = authHeader.replace("Bearer ", "");

    const user = await authService.login(idToken);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
};
