"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortLaunchById = exports.addNewLaunch = exports.existLaunchWithId = void 0;
const launches_mongo_1 = __importDefault(require("./launches.mongo"));
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
const getAllLaunches = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield launches_mongo_1.default.find({}, { __v: 0, _id: 0 });
});
const saveLaunch = (launch) => __awaiter(void 0, void 0, void 0, function* () {
    yield launches_mongo_1.default.updateOne({
        flightMumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
});
saveLaunch(launch);
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
