import { RequestHandler } from "express";
import getAllLaunches, {
  abortLaunchById,
  addNewLaunch,
  existLaunchWithId,
} from "../../models/launches.model";

const httpGetAllLaunches: RequestHandler = async (req, res) => {
  return res.status(200).json( await getAllLaunches());
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
  addNewLaunch(launch);
  return res.status(201).json(launch);
};

export const httpAbortLaunch: RequestHandler = (req, res) => {
  const launchId = +req.params.id;

  //if launch doesnt exist
  if (!existLaunchWithId(launchId)) {
    res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = abortLaunchById(launchId)
  return res.status(200).json(aborted)
};

export default httpGetAllLaunches;
