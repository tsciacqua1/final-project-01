import express, { json, urlencoded } from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import { config } from "dotenv";

config();

const { PORT } = process.env;

const port = PORT || 8080;

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api", routes);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(500).send({ error: true, error: err.message });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
