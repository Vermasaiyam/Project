import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createLeavePolicy, getCompanyLeaves, updateCompanyLeavePolicy } from "../controller/leave.controller";

const router = express.Router();

router.route("/create").post(isAuthenticated, createLeavePolicy);
router.route("/update").put(isAuthenticated, updateCompanyLeavePolicy);
router.route("/").get(isAuthenticated, getCompanyLeaves);

export default router;