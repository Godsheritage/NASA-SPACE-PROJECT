import { RequestHandler } from "express";
import getAllPlanets from "../../models/planets.model";

const httpgetAllPlanets: RequestHandler = (req, res) => {
  res.status(200).json(getAllPlanets());
};

export default httpgetAllPlanets;
