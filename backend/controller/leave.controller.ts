import { Request, Response } from "express";
import { LeavePolicy } from "../models/leave.model";
import { fetchLatestLeavePolicy } from "../service/leave.service";

export const createLeavePolicy = async (req: Request, res: Response) => {
  try {
    const {
      casual,
      sick,
      earned,
      bereavement,
      examLeave,
      marriageLeave,
      unpaidLeave,
      carryForward,
      maxCarryForward,
      encashmentAllowed,
      year,
    } = req.body;

    const leavePolicy = new LeavePolicy({
      casual,
      sick,
      earned,
      compOffs: 0,
      bereavement,
      examLeave,
      marriageLeave,
      unpaidLeave,
      carryForward,
      maxCarryForward,
      encashmentAllowed,
      year,
    });

    await leavePolicy.save();

    return res.status(201).json({
      success: true,
      message: "Company leave policy created successfully",
      data: leavePolicy,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error creating leave policy",
      error: error.message,
    });
  }
};

export const getCompanyLeaves = async (req: Request, res: Response) => {
  try {
    const latestPolicy = await fetchLatestLeavePolicy();

    if (!latestPolicy) {
      return res.status(404).json({
        success: false,
        message: "No leave policy found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company leave policies fetched successfully",
      data: latestPolicy,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching leave policies",
      error: error.message,
    });
  }
};

export const updateCompanyLeavePolicy = async (req: Request, res: Response) => {
  try {
    const latestPolicy = await LeavePolicy.findOne().sort({ createdAt: -1 });

    if (!latestPolicy) {
      return res.status(404).json({
        success: false,
        message: "No leave policy found to update",
      });
    }

    req.body.compOffs = 0;

    Object.assign(latestPolicy, req.body);
    await latestPolicy.save();

    return res.status(200).json({
      success: true,
      message: "Company leave policy updated successfully",
      data: latestPolicy,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error updating leave policy",
      error: error.message,
    });
  }
};
