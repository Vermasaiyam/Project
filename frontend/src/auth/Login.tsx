import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail, Sparkles, Shield, Building2 } from "lucide-react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { userLoginSchema } from "@/schema/userSchema";
import type { LoginInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { colors } from "@/colors/theme";

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const navigate = useNavigate();

    const [errors, setErrors] = useState<Partial<LoginInputState>>({});

    const { login, loading } = useUserStore();

    const [input, setInput] = useState<LoginInputState>({
        workEmail: "",
        password: "",
    });

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const loginSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = userLoginSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors as Partial<LoginInputState>)
            return;
        }
        try {
            await login(input);
            navigate("/");
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
                {/* <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                            <Building2 className="text-white" size={32} />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HR Portal</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Employee Management System</p>
                        </div>
                    </div>
                </div> */}

                {/* Login Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                            <Shield className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-blue-100">Sign in to access your HR dashboard</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={loginSubmitHandler} className="p-8 space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Work Email
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <Input
                                    type="email"
                                    placeholder="Work Email"
                                    name="workEmail"
                                    value={input.workEmail}
                                    onChange={changeEventHandler}
                                    className="pl-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                                    required
                                />
                                {errors && errors.workEmail && (
                                    <span className="text-xs text-red-500 mt-1 block">{errors.workEmail}</span>
                                )}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <LockKeyhole size={18} />
                                </div>
                                <Input
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    className="pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 user-select-none"
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
                                        handleClick();
                                    }}
                                >
                                    {show ? <IoEyeOff /> : <IoEye />}
                                </button>
                                {errors && errors.password && (
                                    <span className="text-xs text-red-500 mt-1 block">{errors.password}</span>
                                )}
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <div className="space-y-4">
                            {loading ? (
                                <Button 
                                    disabled 
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={18} />
                                    Login
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
                                    New to HR Portal?
                                </span>
                            </div>
                        </div>

                        {/* Signup Link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link 
                                    to="/signup" 
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
                                >
                                    Sign Up
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

export default Login;