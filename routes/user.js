import express from 'express'
import userController from '../controllers/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

export const userRouter = express.Router()

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.get("/user/:id", userController.getUser)
userRouter.patch("/update/:id", isAuthenticated, userController.update)
userRouter.get("/search-users", userController.searchUser )