import express from "express";
import { cardController } from "~/controllers/cardController";
import { handleVerifyToken } from "~/middlewares/verifyToken";
import { cardValidate } from "~/validations/cardValidation";

const Router = express.Router();
Router.use(handleVerifyToken);
Router.route("/").post(cardValidate.createNew, cardController.createNew);

export const cardRoutes = Router;
