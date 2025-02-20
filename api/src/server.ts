import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import ApiRoutes from "./routes/notificationRoutes.js";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const port = process.env.PORT || 3000;

app.use("/api", ApiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
