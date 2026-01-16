import express from "express";
import tripController from "../controllers/tripController.js";
import isAuthenticated from '../middleware/isAuthenticated.js'

export const tripRouter = express.Router()

tripRouter.post("/create", isAuthenticated, tripController.createTrip)
tripRouter.get("/allTrips", isAuthenticated, tripController.getTrips)
tripRouter.get("/:id", tripController.getTrip)
tripRouter.patch("/update/:id", isAuthenticated, tripController.updateTrip)
tripRouter.delete("/delete/:id", isAuthenticated, tripController.deleteTrip)
