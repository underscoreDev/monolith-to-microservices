import cors from "cors";
import { sequelize } from "./sequelize";
import express, { Request, Response } from "express";
import { IndexRouter } from "./controllers/v0/index.router";
import { V0_USER_MODELS } from "./controllers/v0/model.index";

export const dbConnect = async () => {
  sequelize.addModels(V0_USER_MODELS);
  console.debug("Initialize database connection...");
  await sequelize.sync();
};

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(
  cors({
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "Authorization",
    ],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    origin: "*",
  })
);

app.use("/api/v0/", IndexRouter);

// Root URI call
app.get("/", async (req: Request, res: Response) => {
  res.send("/api/v0/");
});

// Start the Server
app.listen(port, async () => {
  await dbConnect();
  console.log(`server running ${port}`);
  console.log(`press CTRL+C to stop server`);
});
