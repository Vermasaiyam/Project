export type UserSummary = {
  _id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  employeeCode: string;
  designation: string;
  department: string;
  status: "Active" | "On Notice" | "Resigned" | "Terminated";
  profilePicture?: string;
  isVerified: boolean;
};