"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlanetsData = void 0;
const fs = require("fs");
const path_1 = __importDefault(require("path"));
const parse = require("csv-parse");
const habitablePlanets = [];
function isHabitablePlanet(planet) {
    return (planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6);
}
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path_1.default.join(__dirname, "..", "..", "data", "kepler_data.csv"))
            .pipe(parse({
            comment: "#",
            columns: true,
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
exports.default = habitablePlanets;