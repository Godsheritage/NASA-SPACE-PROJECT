import { RequestHandler } from "express";
import launches from "../../../models/launches.model";

const getAllLaunches: RequestHandler = (req, res) => {
  return res.status(200).json(Array.from(launches.values()));
};

export default getAllLaunches;
