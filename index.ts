import express, { Express, Request, Response } from "express";
import clientRoutes from "./routes/client/index.route";

// env
import dotenv from "dotenv";
dotenv.config();
// End env

// database
import * as database from "./config/database";
database.connect();
// End database

const app: Express = express();
const port: number | string = 3000 || process.env.PORT;

// pug
app.set("views", "./views");
app.set("view engine", "pug");
// End pug

// static file
app.use(express.static("public"));
// End static file

// Client Routes

clientRoutes(app);
// End Client Routes


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
