import mongoose, { Schema, model } from 'mongoose'

const commentSchema = new Schema({
      text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      targetType: {
        type: String,
        enum: ["Journal", "Photo", "Destination"],
        required: true
      },
      targetId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "targetType", //dynamic ref
        required: true
      },
}, {timestamps: true})

export default model("Comment", commentSchema)