import http from 'http'

import app from "./app";

import mongoose from 'mongoose';

import { loadPlanetsData } from "./models/planets.model";


const PORT = process.env.PORT || 5000;

const MONGO_URL = 'mongodb+srv://nasa-api:Heritage4lyf@nasacluster.ndy00.mongodb.net/nasa?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB Connection is ready')
})

mongoose.connection.on('eror', (err) => {
  console.error(err)
})

const startServer = async () => {
  
  await loadPlanetsData();

  //
// extra options that should have gione wuth mongoose.connect {
  //   useNewUrlParser:true,
  //   useFindAndModify:false,
  //   useCrateIndex:true,
  //   useUnifiedTopology:true
    
  
  // }

  await mongoose.connect(MONGO_URL)

  server.listen(PORT, () => {
    console.log(`server is listenening on port ${PORT}...`);
  });

};

startServer()
