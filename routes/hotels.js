import express from 'express'
import hotelsController from '../controllers/hotelsController.js'
export const hotelRouter = express.Router()

hotelRouter.get("/hotels", hotelsController.getHotels)