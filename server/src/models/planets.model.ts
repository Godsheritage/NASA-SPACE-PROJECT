const fs = require("fs");
import path from "path";
const parse = require("csv-parse");

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
        })
      )
      .on("data", (data: any) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err: any) => {
        console.log(err);
      })
      .on("end", () => {
        console.log(
          habitablePlanets.map((planet: any) => {
            return planet["kepler_name"];
          })
        );
        console.log(`${habitablePlanets.length} habitable planets found!`);
      });
  });
}
