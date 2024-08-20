import express, { Express, Request, Response } from "express";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";

import path from "path";

// env
import dotenv from "dotenv";
dotenv.config();
// End env

import bodyParse from "body-parser";

// database
import * as database from "./config/database";
import { systemConfig } from "./config/config";
database.connect();
// End database

const app: Express = express();
const port: number | string = 3000 || process.env.PORT;

// pug
app.set("views", "./views");
app.set("view engine", "pug");
// End pug

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// End App Local Variables

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// static file
app.use(express.static("public"));
// End static file

// Client Routes
clientRoutes(app);
// End Client Routes

// Admin Routes
adminRoutes(app);
// End admin Routes

// body parser
app.use(bodyParse.urlencoded({ extended: false }));
// End body parser

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
