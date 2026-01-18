import mongoose, { Schema, model } from "mongoose";

const photoSchema = new Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },
    url: {
        type: String,
        required: [true, "Photo URL is required"]
    },
    caption: {
        type: String,
        default:' '
    },
    publicId: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default model("Photo", photoSchema)