import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import logger from "morgan";
import path from "path";
import { ServerConfigs } from "./config/server-config";
import { MongoDbDatasource } from "./datasource/mongo-datasource";
import { AppContainer } from "./init/app-container";
import session from "express-session";
import passport from "passport";
import { PassPortConfigs } from "./config/passport-config";
import { RouterUris } from "./config/router-uri";

const app = express();
const router = express.Router();
const routeWhiteList: string[] = [RouterUris.INDEX, RouterUris.LOG_IN];

app.use(express.json());

app.use(
  session({
    secret: PassPortConfigs.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

app.all("*", function (req, res, next) {
  if (!req.user && !routeWhiteList.includes(req.url)) {
    res.redirect(RouterUris.LOG_IN);
  } else {
    next();
  }
});

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
