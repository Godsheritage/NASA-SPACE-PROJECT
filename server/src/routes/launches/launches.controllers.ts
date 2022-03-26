import { RequestHandler } from "express";
import getAllLaunches, { addNewLaunch } from "../../models/launches.model";

const httpGetAllLaunches: RequestHandler = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

export const httpAddNewLaunch: RequestHandler = (req, res) => {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "missing required launch properties",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "invalid launch date",
    });
  }
  else{
    addNewLaunch(launch);
    return res.status(201).json(launch);
  }

};

export default httpGetAllLaunches;
