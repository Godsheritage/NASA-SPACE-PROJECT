"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlanetsData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parse_1 = require("csv-parse");
// import planet from "./planets.mongo";
const habitablePlanets = [];
function isHabitablePlanet(planet) {
    return (planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6);
}
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "..", "data", "kepler_data.csv"))
            .pipe((0, csv_parse_1.parse)({
            comment: "#",
            columns: true,
            relax_quotes: true,
            relax_column_count: true,
        }))
            .on("data", (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
            .on("error", (err) => {
            console.log(err);
            reject(err);
        })
            .on("end", () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    });
}
exports.loadPlanetsData = loadPlanetsData;
const getAllPlanets = () => {
    return habitablePlanets;
};
exports.default = getAllPlanets;
