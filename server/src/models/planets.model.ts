import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import planets from "./planets.mongo"; 

const habitablePlanets: any = [];

function isHabitablePlanet(planet: any) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

export function loadPlanetsData() {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
          relax_quotes: true,
          relax_column_count: true,
        })
      )
      .on("data", async (data: any) => {
        if (isHabitablePlanet(data)) {
          //TODO create the upsert statement
        //  await planets.create({
        //    keplerName : data.kepler_name
        //  })
        }
      })
      .on("error", (err: any) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

const getAllPlanets = async () => {
  return await planets.find({})
};

export default getAllPlanets;
