import express, { Express, Request, Response } from "express";
import "colors";

const dotenv = require("dotenv").config();
const port: number = (process.env.PORT as unknown as number) || 5000;
const app: Express = express();

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}`.cyan.underline
  );
});
