import axios from "axios";

const API_URL = "http://localhost:5000";

const httpGetPlanets = async () => {
  // Load planets and return as JSON.
  const response = await axios.get(`${API_URL}/planets`);
  return response.data;
};

// Load launches, sort by flight number, and return as JSON.
const httpGetLaunches = async () => {
  const response = await axios.get(`${API_URL}/launches`);
  const fetchedLaunches = response.data;
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
};

// Submit given launch data to launch system.

const httpSubmitLaunch = async (launch) => {
  return await axios.post(`${API_URL}/launches`, launch);
};

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
