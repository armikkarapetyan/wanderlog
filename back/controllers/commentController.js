import { Comment } from "../models/index.js"

class commentController{

    async createComment(req,res){
        try{
            const { text, targetType, targetId } = req.body

            if(!text || !targetType || !targetId){
                return res.status(400).send({message: "All fields are required"})
            }

            const comment = await Comment.create({
                text: text,
                user: req.user._id,
                targetType,
                targetId,
            })

            return res.status(201).send({ok: true, comment})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async deleteComment(req,res){
      try{
        const { id } = req.params

        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(400).send({message: "Comment is not found"})
        }

        if(!comment.user.equals(req.user._id)){
            return res.status(400).send({message: "Only owner can delete this post"})
        }

        await comment.deleteOne()
        return res.status(201).send({ok: true, comment})
    }catch(err){
        return res.status(400).send({message: err.message})
    }
    }

    async updateComment(req,res){
        try{
           const { id } = req.params
           const { text } = req.body

           const comment = await Comment.findById(id)
           if(!comment){
              return res.status(400).send({message: "Comment not found"})
           }

           if(!comment.user.equals(req.user._id)){
              return res.status(400).send({message: "Only owner can update this comment"})
           }

           if(text) comment.text = text
           await comment.save()

           return res.status(200).send({ok: true, comment })
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async getComments(req,res){
        try{
            const { targetType, targetId } = req.params
            const comments = await Comment.find({ targetType, targetId })
                .populate("user", "name surname username")
                .sort({ createdAt: -1 })
            
            return res.status(200).send({ok: true, comments})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }
}

export default new commentController()