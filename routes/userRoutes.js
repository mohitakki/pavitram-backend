import { Router } from "express";
import { register,login, logout } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(login)
router.route("/logout").get(logout)







export default router