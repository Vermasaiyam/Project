import { z } from "zod";

export const leavePolicySchema = z.object({
  casual: z.number().default(12),
  sick: z.number().default(12),
  earned: z.number().default(0),
  compOffs: z.number().default(0),
  bereavement: z.number().default(5),
  examLeave: z.number().default(0),
  marriageLeave: z.number().default(7),
  unpaidLeave: z.number().default(-1),

  carryForward: z.boolean().default(false),
  maxCarryForward: z.number().default(0),
  encashmentAllowed: z.boolean().default(false),
  year: z.number().default(new Date().getFullYear()),
});

export type LeavePolicyInputState = z.infer<typeof leavePolicySchema>;
