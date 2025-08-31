import { z } from "zod";

// Education
export const educationSchema = z.object({
  qualification: z.string().min(1, "Qualification is required."),
  degree: z.string().optional(),
  college: z.string().optional(),
  passingYear: z.number().optional(),
  gradeOrPercentage: z.string().optional(),
  marksheet10: z.string().optional(),
  marksheet12: z.string().optional(),
  graduation: z.string().optional(),
  masters: z.string().optional(),
  highest: z.string().optional(),
});

// Employment
export const employmentSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required."),
  designation: z.string().min(1, "Designation is required."),
  fromDate: z.string().transform((val) => new Date(val)), // ISO string
  toDate: z.string().transform((val) => new Date(val)).optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

// Employment History
export const employmentHistorySchema = z.object({
  totalExperience: z.string().optional(),
  pastEmployments: z.array(employmentSchema).optional(),
});

// Salary Account
export const salaryAccountSchema = z.object({
  bankName: z.string().min(1, "Bank name is required."),
  accountNumber: z.string().min(5, "Invalid account number."),
  ifscCode: z.string().min(5, "Invalid IFSC code."),
  branchName: z.string().min(1, "Branch name is required."),
  uan: z.string().optional(),
  pfAccountNumber: z.string().optional(),
  esicNumber: z.string().optional(),
  salaryStructure: z
    .object({
      basic: z.number().optional(),
      hra: z.number().optional(),
      allowances: z.number().optional(),
      deductions: z.number().optional(),
    })
    .optional(),
  taxDeclaration: z.string().optional(),
});

// Dependents
export const childSchema = z.object({
  childrenName: z.string().optional(),
  dob: z.string().transform((val) => new Date(val)).optional(),
  gender: z.string().optional(),
  relationship: z.string().optional(),
});

export const dependentSchema = z.object({
  spouseName: z.string().optional(),
  spouseDob: z.string().transform((val) => new Date(val)).optional(),
  children: z.array(childSchema).optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

// Leave Balance
export const leaveBalanceSchema = z.object({
  casual: z.number().default(0),
  sick: z.number().default(0),
  earned: z.number().default(0),
  compOffs: z.number().default(0),
  bereavement: z.number().default(0),
  examLeave: z.number().default(0),
  marriageLeave: z.number().default(0),
  unpaidLeave: z.number().default(0),
});

// ---------------- Main User Create Schema ----------------
export const createUserSchema = z.object({
  employeeCode: z.string().min(1, "Employee code is required."),
  firstName: z.string().min(1, "First name is required."),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required."),
  personalEmail: z.string().email("Invalid personal email."),
  workEmail: z.string().email("Invalid work email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  contactNumber: z.string().min(10).max(10, "Invalid contact number."),
  workPhone: z.string().optional(),
  address: z.string().default("Update your address"),
  city: z.string().default("Update your city"),
  country: z.string().default("Update your country"),
  dateOfJoining: z.string().transform((val) => new Date(val)),
  dob: z.string().transform((val) => new Date(val)),
  department: z.string().min(1, "Department is required."),
  designation: z.string().min(1, "Designation is required."),
  employmentType: z.enum(["Full-time", "Part-time", "Intern", "Contract"]),
  workLocation: z.string().optional(),
  reportingManagerId: z.string().optional(),
  isVerified: z.boolean().default(false),

  // Identity
  aadharCardNumber: z.string().min(12, "Invalid Aadhar number."),
  aadharCardImage: z.string().optional(),
  panCardNumber: z.string().min(10, "Invalid PAN number."),
  panCardImage: z.string().optional(),
  passportNumber: z.string().optional(),
  passportExpiry: z.string().transform((val) => new Date(val)).optional(),
  drivingLicenseNumber: z.string().optional(),

  // HR Info
  profilePicture: z.string().optional(),
  resume: z.string().optional(),
  superAdmin: z.boolean().default(false),
  admin: z.boolean().default(false),
  bloodGroup: z.string().optional(),
  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]).optional(),
  noticePeriod: z.string().optional(),
  exitDate: z.string().transform((val) => new Date(val)).optional(),
  status: z.enum(["Active", "On Notice", "Resigned", "Terminated"]).default("Active"),

  // Nested
  educationalDetails: z.array(educationSchema).optional(),
  employmentHistory: employmentHistorySchema.optional(),
  salaryAccountDetails: salaryAccountSchema.optional(),
  dependentDetails: dependentSchema.optional(),
  leaveBalance: leaveBalanceSchema.optional(),
});

export type CreateUserInputState = z.infer<typeof createUserSchema>;


export const userLoginSchema = z.object({
    workEmail: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be of at least 8 characters.")
});

export type LoginInputState = z.infer<typeof userLoginSchema>;

export const userResetPasswordSchema = z.object({
    oldPassword: z.string().min(8, "Old Password must be of at least 8 characters."),
    newPassword: z.string().min(8, "New Password must be of at least 8 characters."),
});

export type ResetPasswordInputState = z.infer<typeof userResetPasswordSchema>;