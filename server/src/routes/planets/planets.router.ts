import express from "express";
import { getAllPlanets } from "./planets.controllers";





const planetRouter = express.Router();

planetRouter.get("/planets", getAllPlanets);

export default planetRouter;
