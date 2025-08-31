import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Mail, Building2, Sparkles, MailCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [val, setVal] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<any>([]);
    const navigate = useNavigate();

    const {verifyEmail, loading} = useUserStore();

    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...val];
            newOtp[index] = value;
            setVal(newOtp);
            if (value !== "" && index < 5) {
                inputRef.current[index + 1].focus();
            }
        }
    }

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !val[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = val.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        inputRef.current[0].focus();
    }, []);

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

                {/* Verify Email Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                            <MailCheck className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
                        <p className="text-blue-100">Enter the verification code sent to your email</p>
                    </div>

                    {/* Form */}
                    <div className="p-8 space-y-6">
                        {/* Information Box */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <Mail className="text-blue-500 mt-0.5" size={18} />
                                <div>
                                    <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-1">
                                        Check Your Email
                                    </h4>
                                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                                        We've sent a 6-digit verification code to your email address. Please enter it below to continue.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* OTP Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                                    Verification Code
                                </label>
                                <div className="flex justify-between gap-2">
                                    {val.map((letter: string, index: number) => {
                                        return (
                                            <Input
                                                key={index}
                                                ref={(element) => {inputRef.current[index] = element}}
                                                type="text"
                                                value={letter}
                                                className="h-12 w-12 text-center text-xl font-semibold rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                                                maxLength={1}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                                    handleKeyDown(index, e)
                                                }
                                            />
                                        )
                                    })}
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
                                        Verifying...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <Sparkles size={18} />
                                        Verify Email
                                    </Button>
                                )}
                            </div>
                        </form>

                        {/* Resend Code */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Didn't receive the code?
                            </p>
                            <Button
                                variant="ghost"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline h-auto p-0"
                                onClick={() => {
                                    // Add resend logic here
                                    console.log("Resend verification code");
                                }}
                            >
                                Resend Code
                            </Button>
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
                                    to="/login" 
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
                                >
                                    Back to Login
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Wrong email? 
                                <Link 
                                    to="/signup" 
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline ml-1"
                                >
                                    Sign up again
                                </Link>
                            </p>
                        </div>
                    </div>
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
}

export default VerifyEmail;