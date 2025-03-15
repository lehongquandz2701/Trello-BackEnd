import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoutes } from "./boardRoutes";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "apis v1",
  });
});

Router.use("/boards", boardRoutes);

export const APIs_V1 = Router;
