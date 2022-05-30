import cors from "cors";
import path from "path";
import morgan from "morgan";
import dotenv from 'dotenv'
import express from "express";
import planetRouter from "./routes/planets/planets.routers";
import launchesRouter from "./routes/launches/launches.routers";

const app = express();
dotenv.config()
app.use(cors());

app.use(morgan("combined"));
app.use(express.json());
app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "dists")));
  app.get("/*", (req, res) => { 
    res.sendFile(path.join(__dirname, "..", "dists", "index.html"));
  });
}

export default app;
