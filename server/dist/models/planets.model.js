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
exports.loadPlanetsData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parse_1 = require("csv-parse");
const planets_mongo_1 = __importDefault(require("./planets.mongo"));
// const habitablePlanets: any = [];
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
            .on("data", (data) => __awaiter(this, void 0, void 0, function* () {
            if (isHabitablePlanet(data)) {
                savePlanet(data);
            }
        }))
            .on("error", (err) => {
            console.log(err);
            reject(err);
        })
            .on("end", () => __awaiter(this, void 0, void 0, function* () {
            const countPlanetsFound = (yield getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
        }));
    });
}
exports.loadPlanetsData = loadPlanetsData;
const getAllPlanets = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield planets_mongo_1.default.find({}, { __v: 0, _id: 0 });
});
const savePlanet = (planet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield planets_mongo_1.default.updateOne({
            keplerName: planet.kepler_name,
        }, { keplerName: planet.kepler_name }, { upsert: true });
    }
    catch (err) {
        console.error(`could not save planet, ${err}`);
    }
});
exports.default = getAllPlanets;
