import express from "express";
import { authController } from "~/controllers/authController";
import { authValidate } from "~/validations/authValidatation";

const Router = express.Router();

Router.route("/register").post(authValidate.createNew, authController.register);

Router.route("/login").get(authController.login);

export const authRoutes = Router;
