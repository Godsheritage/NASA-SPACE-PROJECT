"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const launches_controllers_1 = __importDefault(require("./launches.controllers"));
const launches_controllers_2 = require("./launches.controllers");
const launchesRouter = express_1.default.Router();
launchesRouter.get('/', launches_controllers_1.default);
launchesRouter.post('/', launches_controllers_2.httpAddNewLaunch);
exports.default = launchesRouter;
