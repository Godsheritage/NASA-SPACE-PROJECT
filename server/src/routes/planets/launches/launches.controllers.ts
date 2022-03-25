import { RequestHandler } from "express";
import getAllLaunches, { addNewLaunch } from "../../../models/launches.model";

const httpGetAllLaunches: RequestHandler = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

export const httpAddNewLaunch: RequestHandler = (req, res) => {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  addNewLaunch(launch);

  return res.status(201).json(launch);
};

export default httpGetAllLaunches;
