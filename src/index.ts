import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import { ServerConfigs } from "./config/server-config";
import { MongoDbDatasource } from "./datasource/mongo-datasource";

import { AppContainer } from "./init/app-container";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

const appContainer = new AppContainer(router);
appContainer.init();

router.get("*", (req, res) => res.status(404).render("404"));
app.use("", router);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("500");
  }
);

const dataSource = new MongoDbDatasource();
dataSource.connect();

const server = http.createServer(app);
server.listen(ServerConfigs.PORT, () => console.log("run!"));
