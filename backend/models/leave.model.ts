import mongoose, { Document, Model } from "mongoose";

export interface ILeavePolicy {
  casual: number;
  sick: number;
  earned: number;
  compOffs?: number;
  bereavement?: number;
  examLeave?: number;
  marriageLeave?: number;
  unpaidLeave?: number;

  carryForward?: boolean;
  maxCarryForward?: number;
  encashmentAllowed?: boolean;
  year?: number;
}

export interface ILeavePolicyDocument extends ILeavePolicy, Document {
  createdAt: Date;
  updatedAt: Date;
}

const leavePolicySchema = new mongoose.Schema<ILeavePolicyDocument>(
  {
    casual: { type: Number, required: true, default: 12 },
    sick: { type: Number, required: true, default: 12 },
    earned: { type: Number, required: true, default: 0 },
    compOffs: { type: Number, default: 0 },
    bereavement: { type: Number, default: 5 },
    examLeave: { type: Number, default: 0 },
    marriageLeave: { type: Number, default: 7 },
    unpaidLeave: { type: Number, default: -1 },

    carryForward: { type: Boolean, default: false },
    maxCarryForward: { type: Number, default: 0 },
    encashmentAllowed: { type: Boolean, default: false },
    year: { type: Number, default: new Date().getFullYear() },
  },
  { timestamps: true }
);

export const LeavePolicy: Model<ILeavePolicyDocument> =
  mongoose.model<ILeavePolicyDocument>("LeavePolicy", leavePolicySchema);
