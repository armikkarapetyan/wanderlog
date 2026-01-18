import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router()

// Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

     res.json({
      message: "Google login successful",
      token,
      user: req.user
    })
    // Redirect back to frontend with token
    //res.redirect(`http://localhost:5173/login-success?token=${token}`)
  }
)

export default router
