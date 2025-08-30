import mongoose, { Document, Model } from "mongoose";

export interface IEducation {
  qualification: string;
  degree?: string;
  college?: string;
  passingYear?: number;
  gradeOrPercentage?: string;
  marksheet10?: string;
  marksheet12?: string;
  graduation?: string;
  masters?: string;
  highest?: string;
}

export interface IEmployment {
  organizationName: string;
  designation: string;
  fromDate: Date;
  toDate?: Date;
  location?: string;
  skills?: string[];
}

export interface IEmploymentHistory {
  totalExperience?: string;
  pastEmployments?: IEmployment[];
}

export interface ISalaryAccount {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  uan?: string;
  pfAccountNumber?: string;
  esicNumber?: string;
  salaryStructure?: {
    basic?: number;
    hra?: number;
    allowances?: number;
    deductions?: number;
  };
  taxDeclaration?: string;
}

export interface IChild {
  childrenName?: string;
  dob?: Date;
  gender?: string;
  relationship?: string;
}

export interface IDependent {
  spouseName?: string;
  spouseDob?: Date;
  children?: IChild[];
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactPhone?: number;
}

export interface ILeaveBalance {
  casual: number;
  sick: number;
  earned: number;
  compOffs: number;
  bereavement: number;
  examLeave: number;
  marriageLeave: number;
  unpaidLeave: number;
}

export interface IUser {
  employeeCode: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  personalEmail: string;
  workEmail?: string;
  password: string;
  contactNumber: number;
  workPhone?: number;
  address: string;
  city: string;
  country: string;
  dateOfJoining: Date;
  department: string;
  designation: string;
  employmentType: "Full-time" | "Part-time" | "Intern" | "Contract";
  workLocation: string;
  reportingManagerId?: string;

  // Identity & Compliance
  aadharCardNumber: string;
  aadharCardImage: string;
  panCardNumber: string;
  panCardImage: string;
  passportNumber?: string;
  passportExpiry?: Date;
  drivingLicenseNumber?: string;

  // HR Related
  profilePicture: string;
  resume: string;
  superAdmin: boolean;
  admin: boolean;
  lastLogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;

  // Additional HR Info
  bloodGroup?: string;
  maritalStatus?: "Single" | "Married" | "Divorced" | "Widowed";
  noticePeriod?: string;
  exitDate?: Date;
  status: "Active" | "On Notice" | "Resigned" | "Terminated";

  // Nested Models
  educationalDetails?: IEducation[];
  employmentHistory?: IEmploymentHistory;
  salaryAccountDetails?: ISalaryAccount;
  dependentDetails?: IDependent;
  leaveBalance?: ILeaveBalance;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    employeeCode: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    personalEmail: { type: String, required: true, unique: true },
    workEmail: { type: String },
    password: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    workPhone: { type: Number },
    address: { type: String, default: "Update your address" },
    city: { type: String, default: "Update your city" },
    country: { type: String, default: "Update your country" },
    dateOfJoining: { type: Date, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Intern", "Contract"],
      required: true,
    },
    workLocation: { type: String, required: true },
    reportingManagerId: { type: String },

    // Identity
    aadharCardNumber: { type: String, required: true },
    aadharCardImage: { type: String, required: true },
    panCardNumber: { type: String, required: true },
    panCardImage: { type: String, required: true },
    passportNumber: { type: String },
    passportExpiry: { type: Date },
    drivingLicenseNumber: { type: String },

    // HR Info
    profilePicture: { type: String, default: "" },
    resume: { type: String, default: "" },
    superAdmin: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },

    bloodGroup: { type: String },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    noticePeriod: { type: String },
    exitDate: { type: Date },
    status: {
      type: String,
      enum: ["Active", "On Notice", "Resigned", "Terminated"],
      default: "Active",
    },

    // Education
    educationalDetails: [
      {
        qualification: String,
        degree: String,
        college: String,
        passingYear: Number,
        gradeOrPercentage: String,
        marksheet10: String,
        marksheet12: String,
        graduation: String,
        masters: String,
        highest: String,
      },
    ],

    // Employment History
    employmentHistory: {
      totalExperience: String,
      pastEmployments: [
        {
          organizationName: String,
          designation: String,
          fromDate: Date,
          toDate: Date,
          location: String,
          skills: [String],
        },
      ],
    },

    // Salary / Payroll
    salaryAccountDetails: {
      bankName: String,
      accountNumber: String,
      ifscCode: String,
      branchName: String,
      uan: String,
      pfAccountNumber: String,
      esicNumber: String,
      salaryStructure: {
        basic: Number,
        hra: Number,
        allowances: Number,
        deductions: Number,
      },
      taxDeclaration: String,
    },

    // Dependents
    dependentDetails: {
      spouseName: String,
      spouseDob: Date,
      children: [
        {
          childrenName: String,
          dob: Date,
          gender: String,
          relationship: String,
        },
      ],
      emergencyContactName: String,
      emergencyContactRelation: String,
      emergencyContactPhone: Number,
    },

    // Leave Balance
    leaveBalance: {
      casual: { type: Number, default: 0 },
      sick: { type: Number, default: 0 },
      earned: { type: Number, default: 0 },
      compOffs: { type: Number, default: 0 },
      bereavement: { type: Number, default: 0 },
      examLeave: { type: Number, default: 0 },
      marriageLeave: { type: Number, default: 0 },
      unpaidLeave: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);