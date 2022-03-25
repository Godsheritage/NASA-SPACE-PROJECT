import  express  from "express";
import httpGetAllLaunches from "./launches.controllers";
import { httpAddNewLaunch } from "./launches.controllers";

const launchesRouter = express.Router()

launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpAddNewLaunch)


export default launchesRouter