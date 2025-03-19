import express from "express";
import { columnController } from "~/controllers/columnController";
import { columnValidate } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/").post(columnValidate.createNew, columnController.createNew);

export const columnRoutes = Router;
