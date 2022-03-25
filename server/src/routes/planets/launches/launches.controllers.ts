import { RequestHandler } from "express";
import getAllLaunches, { addNewLaunch } from "../../../models/launches.model";

const httpgetAllLaunches: RequestHandler = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpaddNewLaunch: RequestHandler = (req, res) => {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate)

  addNewLaunch(launch);
};

export default httpgetAllLaunches;
