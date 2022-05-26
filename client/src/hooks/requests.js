import axios from "axios";

// const API_URL = "v1";

const httpGetPlanets = async () => {
  // Load planets and return as JSON.
  const response = await axios.get(`/planets`);
  return response.data;
};

// Load launches, sort by flight number, and return as JSON.
const httpGetLaunches = async () => {
  const response = await axios.get(`/launches`);
  const fetchedLaunches = response.data;
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
};

// Submit given launch data to launch system.

const httpSubmitLaunch = async (launch) => {
  try {
    await axios.post(`/launches`, launch);
  } catch (err) {
    return {
      ok: false,
    };
  }
};

// Delete launch with given ID.
const httpAbortLaunch = async (id) => {
  try {
    await axios.delete(`/launches/${id}`);
  } catch (err) {
    console.log(err)
    return {
      ok: false,
    };
  }
};

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
