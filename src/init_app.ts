import { NextFunction, Request, Response } from "express";
import RequestCacheHandler from "./middleware/request-cache";
import RoutesIndex from "./routes/index.routes";
const mkdirp= require('mkdirp')

export default async function InitializeApp(app: any, express: any) {
  const accessControls = require("./middleware/access-controls");
  const mongoose = require("mongoose");
  const cors = require("cors");

  const globalErrorHandler = require('./utils/appErrorHandler');
  const AppError = require('./utils/appError');

  initBodyParser(app);

  // requireStartupFiles();

  await connectMongoose(mongoose);

  clearConsole(app);

  staticResponses(app, express);

  app.set("port", process.env.PORT);

  app.use(accessControls);
  app.use(cors());

  app.use(RequestCacheHandler.getCache);

  // Routes which should handle requests

  RoutesIndex(app);

  app.all('*', (req: any, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(globalErrorHandler);
}

function initBodyParser(app: any) {
  const bodyParser = require("body-parser");

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json()); // to support JSON-encoded bodies
}
function requireStartupFiles() {
  const fs = require("fs");

  function requireFilesFromDir(path: string) {
    fs.readdirSync(path).forEach(function (file: string) {
      require(path + "/" + file);
    });
  }
  // requireFilesFromDir(__dirname + "/models");
  requireFilesFromDir(__dirname + "/common/startup");
}
function staticResponses(app: any, express: any) {
  // in case you want to serve images

  app.use(express.static("public"));

  app.get("/", function (req: any, res: Response) {
    res.status(200).send({
      message: "Express backend server!",
    });
  });
}
async function connectMongoose(mongoose: any) {
  // connection to mongoose
  const node_env = process.env.NODE_ENV;
  let mongoCon = process.env.mongoCon;

  await mongoose.connect(mongoCon, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  mongoose.set("runValidators", true);
  const uploads = mkdirp.sync("uploads");

  mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to database");
  });
  mongoose.connection.on("error", function (err: any) {
    console.log("Mongoose connection error: " + err);
  });
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
  });
}
function clearConsole(app: any) {
  app.use((req: any, res: Response, next: NextFunction) => {
    // console.clear();
    console.log("----------------------------------------------------------");
    next();
  });
}