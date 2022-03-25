import  express  from "express";
import httpgetAllLaunches from "./launches.controllers";

const launchesRouter = express.Router()

launchesRouter.get('/launches', httpgetAllLaunches)

export default launchesRouter