import cloudinary from "../config/cloudinary.js"
import { Destination, Photo } from "../models/index.js"

class photoController{
     
    async uploadPhoto(req,res){
      try{
        const { destId } = req.params
        const  caption  = req.body.caption

        const destination = await Destination.findById(destId)
        if(!destination){
            return res.status(400).send({message: "Destination is not found"})
        }

        if(!req.file){
            return res.status(400).send({message: "No photo uploaded"})
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `wanderlog/photos/${destId}`
        })

        const photo = await Photo.create({
             destination: destId,
             url: result.secure_url,
             caption: caption,
             publicId: result.public_id
        })

        return res.status(200).send({ok: true, photo})
    }catch(err){
        return res.status(400).send({message: err.message})
    }
    }

    async getPhotos(req,res){
        try{
            const { destId } = req.params

            const destination = await Destination.findById(destId)
            if(!destination){
                return res.status(400).send({message: "Destination is not found"})
            }

            const photos = await Photo.find({ destination: destId }).sort({ createdAt: -1 })
            return res.status(200).send({ok: true, photos})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async deletePhoto(req,res){
        try{
           const { photoId } = req.params

            const photo = await Photo.findById(photoId).populate({
                path: "destination",
                populate: { path: "trip"}
            })
            if (!photo) {
                return res.status(404).json({ message: "Photo not found" });
            }

            if(!photo.destination.trip.user.equals(req.user._id)){
                return res.status(403).send({message: "Only owner can delete post"})
            }
            await cloudinary.uploader.destroy(photo.publicId)
            await photo.deleteOne()

            return res.status(200).send({ok: true, message: "Photo deleted successfully"})
        }catch(err){
             return res.status(400).send({message: err.message})
        }
    }
}

export default new photoController()