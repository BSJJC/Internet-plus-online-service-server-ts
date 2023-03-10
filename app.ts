import express, { Express } from "express";
import dotenv from "dotenv";
import "colors";

import router from "./routes/administratorRoute";

dotenv.config();

const port: number = (process.env.PORT as unknown as number) || 5000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/administrator", router);

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}`.cyan.underline
  );
});
