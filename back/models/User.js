import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    email: { 
        type: String,
        required: true, 
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
}, {timestamps: true})

export default model("User", userSchema)