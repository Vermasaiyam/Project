import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Shield, Building2, Sparkles, KeyRound } from "lucide-react";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore"
import { userResetPasswordSchema } from "@/schema/userSchema";
import type { ResetPasswordInputState } from "@/schema/userSchema";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Partial<ResetPasswordInputState>>({});

    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    const [input, setInput] = useState<ResetPasswordInputState>({
        oldPassword: "",
        newPassword: "",
    });

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const { resetPassword, loading } = useUserStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = userResetPasswordSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors as Partial<ResetPasswordInputState>);
            return;
        }

        try {
            await resetPassword(input);
            navigate('/profile')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                            <Building2 className="text-white" size={32} />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HR Portal</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Employee Management System</p>
                        </div>
                    </div>
                </div>

                {/* Reset Password Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                            <KeyRound className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
                        <p className="text-blue-100">Enter your current and new password</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Old Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Current Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <LockKeyhole size={18} />
                                </div>
                                <Input
                                    type={showOldPassword ? "text" : "password"}
                                    name="oldPassword"
                                    placeholder="Enter your current password"
                                    value={input.oldPassword}
                                    onChange={changeEventHandler}
                                    className="pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                                    required
                                    onCopy={(e) => e.preventDefault()}
                                    onPaste={(e) => e.preventDefault()}
                                    onCut={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                    draggable={false}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 h-full flex items-center px-3 bg-slate-100 dark:bg-[#2E3A52] focus:outline-none rounded-r-xl transition-colors hover:bg-slate-200 dark:hover:bg-gray-600"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowOldPassword(!showOldPassword);
                                    }}
                                >
                                    {showOldPassword ? <IoEyeOff /> : <IoEye />}
                                </button>
                                {errors && errors.oldPassword && (
                                    <span className="text-xs text-red-500 mt-1 block">{errors.oldPassword}</span>
                                )}
                            </div>
                        </div>

                        {/* New Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                New Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <LockKeyhole size={18} />
                                </div>
                                <Input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="Enter your new password"
                                    value={input.newPassword}
                                    onChange={changeEventHandler}
                                    className="pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                                    required
                                    onCopy={(e) => e.preventDefault()}
                                    onPaste={(e) => e.preventDefault()}
                                    onCut={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                    draggable={false}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 h-full flex items-center px-3 bg-slate-100 dark:bg-[#2E3A52] focus:outline-none rounded-r-xl transition-colors hover:bg-slate-200 dark:hover:bg-gray-600"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowNewPassword(!showNewPassword);
                                    }}
                                >
                                    {showNewPassword ? <IoEyeOff /> : <IoEye />}
                                </button>
                                {errors && errors.newPassword && (
                                    <span className="text-xs text-red-500 mt-1 block">{errors.newPassword}</span>
                                )}
                            </div>
                        </div>

                        {/* Information Box */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <Shield className="text-blue-500 mt-0.5" size={18} />
                                <div>
                                    <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-1">
                                        Password Security Tips
                                    </h4>
                                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                                        Use at least 8 characters with a mix of letters, numbers, and special characters for better security.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="space-y-4">
                            {loading ? (
                                <Button 
                                    disabled 
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                    Updating Password...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={18} />
                                    Reset Password
                                </Button>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    Need help?
                                </span>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <Link 
                                    to="/profile" 
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
                                >
                                    Back to Profile
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <Link 
                                    to="/" 
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
                                >
                                    Go to Dashboard
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2025 HR Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;