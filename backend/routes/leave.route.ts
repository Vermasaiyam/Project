import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createLeavePolicy, getCompanyLeaves, updateCompanyLeavePolicy } from "../controller/leave.controller";

const router = express.Router();

router.route("/create-leave-policy").post(isAuthenticated, createLeavePolicy);
router.route("/update-leave-policy").put(isAuthenticated, updateCompanyLeavePolicy);
router.route("/get-leave-policy").put(isAuthenticated, getCompanyLeaves);

export default router;