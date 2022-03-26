"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpAbortLaunch = exports.httpAddNewLaunch = void 0;
const launches_model_1 = __importStar(require("../../models/launches.model"));
const httpGetAllLaunches = (req, res) => {
    return res.status(200).json((0, launches_model_1.default)());
};
const httpAddNewLaunch = (req, res) => {
    const launch = req.body;
    if (!launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target) {
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
    (0, launches_model_1.addNewLaunch)(launch);
    return res.status(201).json(launch);
};
exports.httpAddNewLaunch = httpAddNewLaunch;
const httpAbortLaunch = (req, res) => {
    const launchId = +req.params.id;
    //if launch doesnt exist
    if (!(0, launches_model_1.existLaunchWithId)(launchId)) {
        res.status(404).json({
            error: "Launch not found",
        });
    }
    const aborted = (0, launches_model_1.abortLaunchById)(launchId);
    return res.status(200).json(aborted);
};
exports.httpAbortLaunch = httpAbortLaunch;
exports.default = httpGetAllLaunches;
