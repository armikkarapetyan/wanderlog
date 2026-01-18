import mongoose, { Schema, model } from "mongoose"

const journalSchema = new Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: ["happy", "neutral", "sad", "excited", "relaxed"],
        default: "neutral"
    }, 
}, {timestamps: true})

export default model("Journal", journalSchema)