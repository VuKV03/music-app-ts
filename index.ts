import express, { Express, Request, Response } from "express";

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

app.get("/topics", (req: Request, res: Response) => {
  res.render("client/pages/topics/index");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})