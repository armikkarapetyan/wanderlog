import mongoose, { Schema, model } from "mongoose";

const destinationSchema = new Schema({
      trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true
      },
      title: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      description: {
        type: String,
        maxLenght: 500
      },
      dateVisited: {
        type: Date,
        default: Date.now
      },
}, {timestamps: true})

export default model("Destination", destinationSchema)