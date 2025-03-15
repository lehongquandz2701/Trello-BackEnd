import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardController } from "~/controllers/boardController";
import { boardValidate } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: "api get list board",
    });
  })
  .post(boardValidate.createNew);

export const boardRoutes = Router;
