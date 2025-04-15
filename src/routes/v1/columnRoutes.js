import express from "express";
import { columnController } from "~/controllers/columnController";
import { handleVerifyToken } from "~/middlewares/verifyToken";
import { columnValidate } from "~/validations/columnValidation";

const Router = express.Router();
Router.use(handleVerifyToken);
Router.route("/").post(columnValidate.createNew, columnController.createNew);
Router.route("/:id")
  .put(columnValidate.update, columnController.update)
  .delete(columnValidate.deleteColumn, columnController.deleteColumn);

export const columnRoutes = Router;
