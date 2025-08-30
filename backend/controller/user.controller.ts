import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendEmail, sendResetSuccessEmail, sendWelcomeEmaill, sendPasswordResetEmail } from "../utils/sendEmail";
import { fetchLatestLeavePolicy } from "../service/leave.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      employeeCode,
      firstName,
      middleName,
      lastName,
      personalEmail,
      workEmail,
      password,
      contactNumber,
      workPhone,
      address,
      city,
      country,
      dateOfJoining,
      department,
      designation,
      employmentType,
      workLocation,
      reportingManagerId,

      // Identity
      aadharCardNumber,
      aadharCardImage,
      panCardNumber,
      panCardImage,
      passportNumber,
      passportExpiry,
      drivingLicenseNumber,

      // HR Info
      profilePicture,
      resume,
      bloodGroup,
      maritalStatus,
      noticePeriod,
      exitDate,
      status,

      // Education
      educationalDetails,

      // Employment History
      employmentHistory,

      // Salary
      salaryAccountDetails,

      // Dependents
      dependentDetails,
    } = req.body;

    const companyLeaves = await fetchLatestLeavePolicy();
    if (!companyLeaves) {
      return res.status(400).json({
        success: false,
        message: "Company leave policy not configured.",
      });
    }

    // Check duplicate employeeCode or workEmail
    const existingEmployee = await User.findOne({
      $or: [{ employeeCode }, { workEmail }],
    });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee with same code or work email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      employeeCode,
      firstName,
      middleName,
      lastName,
      personalEmail,
      workEmail,
      password: hashedPassword,
      contactNumber,
      workPhone,
      address,
      city,
      country,
      dateOfJoining,
      department,
      designation,
      employmentType,
      workLocation,
      reportingManagerId,

      // Identity
      aadharCardNumber,
      aadharCardImage,
      panCardNumber,
      panCardImage,
      passportNumber,
      passportExpiry,
      drivingLicenseNumber,

      // HR Info
      profilePicture,
      resume,
      bloodGroup,
      maritalStatus,
      noticePeriod,
      exitDate,
      status,

      // Nested Models
      educationalDetails,
      employmentHistory,
      salaryAccountDetails,
      dependentDetails,

      leaveBalance: companyLeaves,
    });

    const userWithoutPassword = await User.findById(user._id).select("-password");

    return res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { workEmail, password } = req.body;

        const user = await User.findOne({ workEmail });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exists."
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or Password."
            });
        }
        generateToken(res, user);

        user.lastLogin = new Date();
        await user.save();

        const userWithoutPassword = await User.findOne({ workEmail }).select("-password");
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.firstName}`,
            user: userWithoutPassword,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { verificationCode } = req.body;

        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() },
        }).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token."
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined
        await user.save();

        // nodemailer implementation
        const message = `Welcome to HR Portal, ${user.firstName}`;
        await sendWelcomeEmaill({
            email: user.workEmail,
            subject: `Welcome to HR Portal`,
            message,
            name: user.firstName,
        })

        return res.status(200).json({
            success: true,
            message: "Email Verified Successfully.",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (_: Request, res: Response) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged Out Successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();

        const forgotPasswordToken = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

        // nodemailer implementation
        const message = `HR Portal : Forgot Password`;
        await sendPasswordResetEmail({
            email: user.workEmail,
            subject: `HR Portal : Forgot Password`,
            message,
            name: forgotPasswordToken,
        })

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist.",
            });
        }
        const { oldPassword, newPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password.",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        // send success reset email
        const message = `Password Reset Successfully.`;
        await sendResetSuccessEmail({
            email: user.workEmail,
            subject: `Password Reset Successfully`,
            message,
        })

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        };
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const {
      firstName,
      middleName,
      lastName,
      personalEmail,
      workEmail,
      contactNumber,
      workPhone,
      address,
      city,
      country,
      department,
      designation,
      employmentType,
      workLocation,
      reportingManagerId,
      bloodGroup,
      maritalStatus,
      noticePeriod,
      profilePicture,
    } = req.body;

    const updatedData: any = {
      firstName,
      middleName,
      lastName,
      personalEmail,
      workEmail,
      contactNumber,
      workPhone,
      address,
      city,
      country,
      department,
      designation,
      employmentType,
      workLocation,
      reportingManagerId,
      bloodGroup,
      maritalStatus,
      noticePeriod,
    };

    if (profilePicture) {
      const cloudResponse = await cloudinary.uploader.upload(profilePicture, {
        folder: "user_profiles",
      });
      updatedData.profilePicture = cloudResponse.secure_url;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
      message: "User profile updated successfully.",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const allUsers = await User.find().select("-password");

        res.status(200).json({
            success: true,
            allUsers,
            message: "All Users Fetched Successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
