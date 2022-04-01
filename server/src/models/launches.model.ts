import launchesDatabase from "./launches.mongo";
import planets from "./planets.mongo";

const launches = new Map();

let latestFlightNumber = 100;

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["Nasa", "Godsheritage"],
  upcoming: true,
  success: true,
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

const getAllLaunches = async () => {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
};

const saveLaunch = async (launch: any) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planets found");
  }
  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};

saveLaunch(launch);

export const existLaunchWithId = (launchId: any) => {
  return launches.has(launchId);
};
//to schedule a new launch and assign the incremental flight number
export const scheduleNewLaunch = async (launch: any) => {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    custumers: ["Godsheritage", "Crownfit"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

// export const addNewLaunch = (launch: any) => {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       upcoming: true,
//       success: true,
//       custumers: ["Godsheritage", "Crownfit"],
//       flightNumber: latestFlightNumber,
//     })
//   );
// };

export const abortLaunchById = (launchId: any) => {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

export default getAllLaunches;
