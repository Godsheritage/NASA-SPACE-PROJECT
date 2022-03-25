"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const launches_model_1 = __importDefault(require("../../../models/launches.model"));
const httpgetAllLaunches = (req, res) => {
    return res.status(200).json((0, launches_model_1.default)());
};
exports.default = httpgetAllLaunches;
