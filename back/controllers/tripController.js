import {Trip} from "../models/index.js"

class tripController {

    async createTrip(req,res){
            try{
               const { title, description, startDate, endDate } = req.body
               if(!title || !description  || !startDate || !endDate){
                  return res.status(400).send({message: "Pls fill all required fields"})
               }

               // Validate date range
               const start = new Date(startDate)
               const end = new Date(endDate)
               if(end <= start){
                  return res.status(400).send({message: "End date must be after start date"})
               }
    
               const trip = await Trip.create({
                  user: req.user._id,
                  title,
                  description, 
                  startDate, 
                  endDate
               })
    
               res.status(201).send({ok: true, trip})
            }catch(err){
                return res.status(400).send({message: err.message})
            }
    }

    async getTrips(req,res){
        try{
           const trips = await Trip.find({user: req.user._id})
               .sort({ createdAt: -1 })

           res.status(200).send({ok: true, count: trips.length, trips})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async getTrip(req,res){
        try{
            const { id } = req.params
            
            const trip = await Trip.findById(id)
            if(!trip){
                return res.status(400).send({message: "Trip doesnot exist"})
            }

            res.status(200).send({ok: true, trip})
        }catch(err){
            return res.status(400).send({message: err.message })
        }
    }

    async updateTrip(req,res){
        try{
           const { id } = req.params
           const { title, description, startDate, endDate } = req.body

           const trip = await Trip.findById(id)
           if(!trip){
                return res.status(400).send({message: "Trip doesnot exist"})
            }

            if(trip.user.toString() !== req.user._id.toString()){
                return res.status(403).send({message: "Not authorized"})
            }
             
            if(title) trip.title = title
            if(description) trip.description = description
            if(startDate) trip.startDate = startDate
            if(endDate) trip.endDate = endDate

            // Validate date range if both dates are being updated
            if(startDate && endDate){
                const start = new Date(startDate)
                const end = new Date(endDate)
                if(end <= start){
                    return res.status(400).send({message: "End date must be after start date"})
                }
            } else if(startDate && trip.endDate){
                const start = new Date(startDate)
                const end = new Date(trip.endDate)
                if(end <= start){
                    return res.status(400).send({message: "End date must be after start date"})
                }
            } else if(endDate && trip.startDate){
                const start = new Date(trip.startDate)
                const end = new Date(endDate)
                if(end <= start){
                    return res.status(400).send({message: "End date must be after start date"})
                }
            }

            await trip.save()
            return res.status(200).send({ok: true, trip})  
        }catch(err){
            return res.status(400).send({message: err.message })
        }
    }

    async deleteTrip(req,res){
        try{
           const { id } = req.params

           const trip = await Trip.findById(id)
           if(!trip){
                return res.status(400).send({message: "Trip doesnot exist"})
            }

           if(trip.user.toString() !== req.user._id.toString()){
                return res.status(400).send({message: "Not authorized"})
            }

           await trip.deleteOne()
           return res.status(201).send({message: "Trip deleted successfully!"})
        }catch(err){
            return res.status(400).send({message: err.message })
        }
    }
}

export default new tripController()