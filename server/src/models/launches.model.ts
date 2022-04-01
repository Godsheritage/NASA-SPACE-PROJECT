import launchesDatabase from "./launches.mongo";

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "kepler-442 b",
  customers: ["Nasa", "Godsheritage"],
  upcoming: true,
  success: true,
};

const getAllLaunches = async () => {
  return await launchesDatabase.find({}, {'_id': 0 , '__v' : 0 });
};

const saveLaunch = async (launch: any) => {
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

export const addNewLaunch = (launch: any) => {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      upcoming: true,
      success: true,
      custumers: ["Godsheritage", "Crownfit"],
      flightNumber: latestFlightNumber,
    })
  );
};

export const abortLaunchById = (launchId: any) => {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

export default getAllLaunches;
