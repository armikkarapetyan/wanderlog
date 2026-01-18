import { Destination, Trip } from "../models/index.js"

class destinationController{
     
    async createDestination(req,res){
        try{
           const { title, location, description, dateVisited } = req.body
           const { tripId } = req.params

           if(!title || !location || !description || !dateVisited){
             return res.status(400).send({message: "All fields are required"})
           }

           const trip = await Trip.findById(tripId)
           if(!trip){
             return res.status(400).send({message: "Trip is not found"})
           }

           const destination = await Destination.create({
               trip: tripId,
               title,
               location,
               description,
               dateVisited
           })

           return res.status(200).send({ok: true, destination})
        }catch(err){
             return res.status(400).send({message: err.message})
        }
    }

    async getDestinations(req,res){
        try{
           const { tripId } = req.params

           const trip = await Trip.findById(tripId)
           if(!trip){
              return res.status(400).send({message: "Trip is not found"})
           }

           const destinations = await Destination.find({ trip: tripId})
               .sort({ dateVisited: -1 })
           return res.status(200).send({ok: true, destinations})
        }catch(err){
             return res.status(400).send({message: err.message})
        }
    }

    async deleteDestination(req,res){
      try{
         const { id } = req.params

         const destination = await Destination.findById(id).populate('trip')
         if(!destination){
             return res.status(400).send({message: "Destination is not found"})
         }

         if(!destination.trip.user.equals(req.user._id)){
            return res.status(400).send({message: "Only owner can delete this destination"})
         }
        
         const deleted = await Destination.findByIdAndDelete(id)
         return res.status(200).send({ok: true, deleted})
         
      }catch(err){
        return res.status(400).send({message: err.message})
      }
    }

    async updateDestination(req,res){
      try{
         const { id } = req.params
         const { title, location, description, dateVisited } = req.body

         const destination = await Destination.findById(id).populate('trip')
         if(!destination){
             return res.status(400).send({message: "Destination is not found"})
         }

         if(!destination.trip.user.equals(req.user._id)){
            return res.status(400).send({message: "Only owner can update this destination"})
         }
         
         if(title) destination.title = title
         if(location) destination.location = location
         if(description) destination.description = description
         if(dateVisited) destination.dateVisited = dateVisited

         await destination.save()
         return res.status(200).send({ok: true, destination})
        }catch(err){
           return res.status(400).send({message: err.message})
        }
    }

    async getDestination(req,res){
       const { id } = req.params

       const destination = await Destination.findById(id)
       if(!destination){
          return res.status(400).send({message: "Destination is not found"})
       }

       return res.status(200).send({ok: true, destination})
    }
}

export default new destinationController()