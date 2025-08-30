import { LeavePolicy } from "../models/leave.model";

export const fetchLatestLeavePolicy = async () => {
  const latestPolicy = await LeavePolicy.findOne().sort({ createdAt: -1 });
  if (!latestPolicy) return null;

  return {
    casual: latestPolicy.casual,
    sick: latestPolicy.sick,
    earned: latestPolicy.earned,
    compOffs: latestPolicy.compOffs,
    bereavement: latestPolicy.bereavement,
    examLeave: latestPolicy.examLeave,
    marriageLeave: latestPolicy.marriageLeave,
    unpaidLeave: latestPolicy.unpaidLeave,
  };
};
