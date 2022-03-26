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

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  return Array.from(launches.values());
};

export const existLaunchWithId = (launchId:any)  => {
  return launches.has(launchId)
}

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
  const aborted = launches.get(launchId)
  aborted.upcoming = false
  aborted.success = false
  return aborted

}

export default getAllLaunches;
