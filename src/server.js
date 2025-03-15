/* eslint-disable no-console */

import express from "express";
import { CONNECT_DB, CLOSE_DB } from "./config/mongodb";
import exitHook from "async-exit-hook";
import { ENVS } from "./config/environment";
import { APIs_V1 } from "./routes/v1";

const START_SERVER = () => {
  const app = express();
  app.use(express.json());

  app.use("/v1", APIs_V1);
  app.get("/", async (req, res) => {
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(ENVS.APP_PORT, ENVS.APP_HOST, () => {
    console.log(
      `Hello Trung Quan Dev, I am running at ${ENVS.APP_HOST}:${ENVS.APP_PORT}/`
    );
  });

  exitHook(() => {
    CLOSE_DB();
  });
};

CONNECT_DB()
  .then()
  .then(async () => {
    START_SERVER();
  })
  .catch((error) => {
    console.log("error", error);
    process.exit(0);
  });
