"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlanets = void 0;
const planets_model_1 = __importDefault(require("../../models/planets.model"));
const getAllPlanets = (req, res) => {
    res.status(200).json(planets_model_1.default);
};
exports.getAllPlanets = getAllPlanets;
