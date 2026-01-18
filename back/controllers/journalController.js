import { Destination, Journal } from "../models/index.js"

class journalController {
    
    async createJournal(req,res){
        try{
           const { title, content, mood } = req.body
           const { destId } = req.params

           const destination = await Destination.findById(destId)
           if(!destination){
             return res.status(400).send({message: "Destination is not found"})
           }

           const journal = await Journal.create({
            destination: destId,
            title, 
            content, 
            mood})
           return res.status(201).send({ok: true, journal})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async updateJournal(req,res){
      try{
        const { id } = req.params
        const { title, content, mood } = req.body

        const journal = await Journal.findById(id).populate({
            path: "destination",
            populate: { path: "trip"}
        })
        if(!journal){
            return res.status(400).send({message: "Journal is not found"})
        }

        if(!journal.destination.trip.user.equals(req.user._id)){
            return res.status(400).send({message: "Only owner can change this journal"})
        }

        if(title) journal.title = title
        if(content) journal.content = content
        if(mood) journal.mood = mood

        await journal.save()
        return res.status(201).send({ok: true, journal})
    }catch(err){
        return res.status(400).send({message: err.message})
    }
    }

    async deleteJournal(req,res){
       try{
        const { id } = req.params

        const journal = await Journal.findById(id).populate({
            path: "destination",
            populate: { path: "trip"}
        })
        if(!journal){
            return res.status(400).send({message: "Journal is not found"})
        }

        if(!journal.destination.trip.user.equals(req.user._id)){
            return res.status(400).send({message: "Only owner can delete this journal"})
        }

        await journal.deleteOne()
        return res.status(201).send({ok: true, message: "Journal deleted successfully"})
    }catch(err){
        return res.status(400).send({message: err.message})
    }
    }

    async getJournals(req,res){
      try{
        const { destId } = req.params

        const journals = await Journal.find({ destination: destId })
            .sort({ createdAt: -1 })
        
        return res.status(200).send({ok: true, journals})
      }catch(err){
        return res.status(400).send({message: err.message})
      }
    }

    async getJournal(req,res){
      try{
        const { id } = req.params

        const journal = await Journal.findById(id)
        if(!journal){
            return res.status(400).send({message: "Journal is not found"})
        }

        return res.status(201).send({ok: true, journal })
    }catch(err){
         return res.status(400).send({message: err.message})
    }
    }
}

export default new journalController()