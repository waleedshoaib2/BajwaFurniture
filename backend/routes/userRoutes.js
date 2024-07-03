import express from "express";
import passport from "passport";

import { checkAuth, isAdmin } from "../middlewares/authMiddleware.js";
import {
  signup,
  login,
  logout,
  profile,
  getAllUsers,
  subscribetoNewsletter,
  getUsersWithNewsletterSubscribed,
  updateUserProfile,
  updatePassword,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update", checkAuth, updateUserProfile);

router.post("/logout", logout);
router.put("/newsletter", checkAuth, subscribetoNewsletter);
router.get("/profile", checkAuth, profile);
router.get(
  "/newsletter-subscribed",
  checkAuth,
  isAdmin,
  getUsersWithNewsletterSubscribed
);

router.get("/all-users", checkAuth, isAdmin, getAllUsers);

// router.put("/update/:id", checkAuth, updatePassword);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

router.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;

  try {
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({ idToken });
    const payload = ticket.getPayload();
    const token = generateJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: "Invalid Google login" });
  }
});
export default router;
