import  express  from "express";
import httpGetAllLaunches , { httpAddNewLaunch, httpAbortLaunch } from "./launches.controllers";

const launchesRouter = express.Router()

launchesRouter.post('/', httpAddNewLaunch)
launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.delete('/:id', httpAbortLaunch)


export default launchesRouter