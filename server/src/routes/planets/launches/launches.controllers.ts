import { RequestHandler } from "express";
import getAllLaunches from "../../../models/launches.model";

const httpgetAllLaunches: RequestHandler = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

export default httpgetAllLaunches;
