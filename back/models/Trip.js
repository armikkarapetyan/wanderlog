import mongoose, { Schema, model } from "mongoose";

const tripSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
      type: Date,
      required: true,
    },
}, { timestamps: true})

export default model("Trip", tripSchema)