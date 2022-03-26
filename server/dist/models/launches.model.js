"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortLaunchById = exports.addNewLaunch = exports.existLaunchWithId = void 0;
const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration x",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "kepler-442 b",
    customers: ["Nasa", "Godsheritage"],
    upcoming: true,
    success: true,
};
launches.set(launch.flightNumber, launch);
const getAllLaunches = () => {
    return Array.from(launches.values());
};
const existLaunchWithId = (launchId) => {
    return launches.has(launchId);
};
exports.existLaunchWithId = existLaunchWithId;
const addNewLaunch = (launch) => {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        upcoming: true,
        success: true,
        custumers: ["Godsheritage", "Crownfit"],
        flightNumber: latestFlightNumber,
    }));
};
exports.addNewLaunch = addNewLaunch;
const abortLaunchById = (launchId) => {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};
exports.abortLaunchById = abortLaunchById;
exports.default = getAllLaunches;
