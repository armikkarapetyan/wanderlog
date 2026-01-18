import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema({
    email: { 
        type: String, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true
    },
    surname: { 
        type: String, 
        required: function() { return !this.provider || this.provider !== 'google' }
    },
    username: { 
        type: String, 
        required: function() { return !this.provider || this.provider !== 'google' },
        unique: [true, "Username is busy"]
    },
    password: { 
        type: String, 
       required: function() { return !this.provider || this.provider !== 'google' },
        minLength: [8, "Password is too short"]
    },
    provider: { 
        type: String, 
        default: 'local' 
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
}, {timestamps: true})

export default model("User", userSchema)