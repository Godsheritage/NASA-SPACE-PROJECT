import express from "express";
import planetRouter from "./routes/planets/planets.router";

const app = express();

app.use(express.json());
app.use(planetRouter); 

export default app;
