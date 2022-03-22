import express  from "express";

const planetRouter = express.Router()


const getAllPlanets = () => {}

planetRouter.get('/planets', getAllPlanets);

export default planetRouter

