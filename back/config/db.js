import mongoose from 'mongoose'
import {env} from './env.js'

export const connectDb = async () => {
        return mongoose.connect(process.env.MONGO_URL)
}

export const disconnectDb = async () => {
    return mongoose.disconnect().then(() => console.log("disconnected!"))
}