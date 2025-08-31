import express from "express";
import { allUsers, checkAuth, forgotPassword, login, logout, resetPassword, createUser, updateUser, verifyEmail, getUserById } from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/create-user").post(createUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(isAuthenticated, resetPassword);
router.route("/profile/update").put(isAuthenticated,updateUser);
router.route("/all-users").get(isAuthenticated, allUsers);
router.route("/user/:id").get(isAuthenticated, getUserById);

export default router;