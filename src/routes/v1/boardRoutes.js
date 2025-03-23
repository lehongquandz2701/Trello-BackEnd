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
  .post(boardValidate.createNew, boardController.createNew);

Router.route("/:id")
  .get(boardController.getDetail)
  .put(boardValidate.update, boardController.update);

Router.route("/support/moving_cards").put(
  boardValidate.arrangeCardsColumn,
  boardController.arrangeCardsColumn
);

export const boardRoutes = Router;
