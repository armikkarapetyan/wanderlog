import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    surname: { 
        type: String, 
        required: true
    },
    username: { 
        type: String, 
        required: true, 
        unique: [true, "Username is busy"]
    },
    password: { 
        type: String, 
        required: true, 
        minLength: [8, "Password is too short"]
    },
}, {timestamps: true})

export default model("User", userSchema)