import express from "express";
import { env } from "./config/env.js";
import "./config/db.js"
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/user.js";
import { tripRouter } from "./routes/trip.js";
import { destinationRouter } from "./routes/destination.js";
import { journalRouter } from "./routes/journal.js";
import { photoRouter } from "./routes/photo.js";
import { commentRouter } from "./routes/comment.js";
import cors from "cors"
import { hotelRouter } from "./routes/hotels.js";

const app = express()

app.use(express.urlencoded())
app.use(express.json())



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/auth", userRouter)
app.use("/trips", tripRouter)
app.use("/destinations", destinationRouter)
app.use("/journals", journalRouter)
app.use("/photos",  photoRouter)
app.use("/comments", commentRouter)
app.use("/api", hotelRouter)


async function start() {
    await connectDb()
    app.listen(env.PORT, async () => {
        console.log(`Server started on: http://localhost:${env.PORT}`)
        console.log("Mongo Connected..")
    })
}

start()