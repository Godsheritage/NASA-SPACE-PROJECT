import { RequestHandler } from "express"
import { planets } from "../../models/planets.model"


export const getAllPlanets:RequestHandler = (req, res) => {
    res.status(200).json(planets)
}