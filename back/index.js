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
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express()

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Allow Swagger UI to work
}))

// Logging
app.use(morgan("dev"))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
})
app.use("/auth", limiter)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Wanderlog API Documentation"
}))

app.use("/auth", userRouter)
app.use("/trips", tripRouter)
app.use("/destinations", destinationRouter)
app.use("/journals", journalRouter)
app.use("/photos",  photoRouter)
app.use("/comments", commentRouter)
app.use("/api", hotelRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).send({ message: "Route not found" })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).send({ 
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    })
})

async function start() {
    await connectDb()
    app.listen(env.PORT, async () => {
        console.log(`Server started on: http://localhost:${env.PORT}`)
        console.log("Mongo Connected..")
    })
}

start()