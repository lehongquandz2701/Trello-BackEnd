import express from "express";
import { cardController } from "~/controllers/cardController";
import { cardValidate } from "~/validations/cardValidation";

const Router = express.Router();

Router.route("/").post(cardValidate.createNew, cardController.createNew);

export const cardRoutes = Router;
