import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import planetRouter from "./routes/planets/planets.routers";
import launchesRouter from "./routes/launches/launches.routers";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public ")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public ", "index.html"));
});
app.use(express.json());
app.use("/planets", planetRouter);
app.use(launchesRouter);

export default app;
