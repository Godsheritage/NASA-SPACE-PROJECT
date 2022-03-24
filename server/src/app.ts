import express from "express";
import planetRouter from "./routes/planets/planets.router";
import cors from "cors";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "..", "public ")));


app.use(express.json());
app.use(planetRouter);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public ", "index.html"));
});

export default app;
