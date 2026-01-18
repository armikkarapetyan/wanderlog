import { User } from "../models/index.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

class userController {
     
    async signup(req,res){
        let { name, surname, username, password } = req.body
        try{
           if(!name || !surname || !username || !password){
               return res.status(400).send({message: "All fields are required!!"})
           }
           
           if (password.length < 8) {
               return res.status(400).send({ message: "Password must be at least 8 characters" });
           }

           // Check if username already exists
           const existingUser = await User.findOne({ username })
           if(existingUser){
               return res.status(400).send({message: "Username already exists"})
           }

           password = await bcrypt.hash(password,10)

           const user = await User.create({ name, surname, username, password })
           return res.status(200).send({ok: true, _id: user._id})
        }catch(err){
            if(err.code === 11000){
                return res.status(400).send({message: "Username already exists"})
            }
            return res.status(400).send({message: err.message})
        }
    }
    
    async login(req,res){
        let { username, password } = req.body
        try{
            if(!username || !password){
                return res.status(401).send({message: "Password and Username are required"})
            }

            const user = await User.findOne({username})
            if(!user){
                return res.status(401).send({message: "User is not found!"})
            }

            if (user.provider === "google") {
                return res.status(401).send({ message: "Use Google login for this account" });
            }

            const valid = await bcrypt.compare(password, user.password)
            if(!valid){
                return res.status(401).send({message: "Invalid credentials!"})
            }

            const token = jwt.sign(
                { id: user._id, username: username},
                process.env.JWT_SECRET,
                { expiresIn:"7d"}
            )

            return res.status(201).send({ok: true, token, user})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async getUser(req,res){
        try{
            const { id } = req.params 

            const user = await User.findById(id).select("-password")
            if(!user){
                return res.status(400).send({message:"User not found"})
            }

            return res.status(201).send({ok: true,  user})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async update(req,res){
        try{
          const { name, surname, username, password } = req.body
          const { id } = req.params

          const user = await User.findById(id)
          if(!user){
            return res.status(400).send({message: "User is not found"})
          }

          if(name) user.name = name
          if(surname) user.surname = surname
          if(username) user.username = username
          if(password) {
            if (password.length < 8) {
              return res.status(400).send({ message: "Password must be at least 8 characters" });
            }
            user.password = await bcrypt.hash(password, 10)
          }

          await user.save()
          return res.status(201).send({ok: true, user: {...user.toObject(), password: undefined}})
        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }

    async searchUser(req,res){
        try{
           const { q } = req.query
           if(!q){
              return res.status(400).send({message: "Query parameter required "})
           }
   
           const users = await User.find({
                $or: [
                    { name: { $regex: q, $options: "i"}},
                    { surname: { $regex: q, $options: "i"}},
                    { username: { $regex: q, $options: "i"}}
                ],
           }).limit(5)

           return res.status(201).send({ ok: true, users})

        }catch(err){
            return res.status(400).send({message: err.message})
        }
    }
}

export default new userController()