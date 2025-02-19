import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { body } from "express-validator";
import protectRoute from "../middlewares/user.middleware.js";
// create router
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("userName")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

router.get("/dashboard", protectRoute, (req, res) => {
  res.json({ message: "welcome to dashboard", user: req.user });
});

export default router;
