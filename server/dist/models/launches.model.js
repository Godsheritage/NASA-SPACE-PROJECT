"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launches = new Map;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration x',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'kepler-442 b',
    customers: ['Nasa', 'Godsheritage'],
    upcoming: true,
    success: true,
};
launches.set(launch.flightNumber, launch);
const getAllLaunches = () => {
    return Array.from(launches.values());
};
exports.default = getAllLaunches;
