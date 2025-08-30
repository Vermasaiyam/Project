import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { LoginInputState, CreateUserInputState, ResetPasswordInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = import.meta.env.VITE_API_END_POINT_USER || "http://localhost:3000/api/user";

axios.defaults.withCredentials = true;

type UserState = {
  user: CreateUserInputState | null;
  allUsers: CreateUserInputState[] | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;

  createUser: (input: CreateUserInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (workEmail: string) => Promise<void>;
  resetPassword: (input: ResetPasswordInputState) => Promise<void>;
  updateProfile: (input: Partial<CreateUserInputState>) => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  updateUsers: (input: Partial<CreateUserInputState>) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      allUsers: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // Create User
      createUser: async (input: CreateUserInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/create-user`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
              loading: false,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to create user");
          set({ loading: false });
        }
      },

      // Login
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
              loading: false,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed");
          set({ loading: false });
        }
      },

      // Verify Email
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
              loading: false,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Email verification failed");
          set({ loading: false });
        }
      },

      // Check Auth
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          } else {
            set({ isAuthenticated: false, isCheckingAuth: false });
          }
        } catch {
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },

      // Logout
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: null, isAuthenticated: false, loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Logout failed");
          set({ loading: false });
        }
      },

      // Forgot Password
      forgotPassword: async (workEmail: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/forgot-password`, {
            workEmail,
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Request failed");
        } finally {
          set({ loading: false });
        }
      },

      // Reset Password
      resetPassword: async (input: ResetPasswordInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password`,
            input,
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Reset failed");
        } finally {
          set({ loading: false });
        }
      },

      // Update Profile
      updateProfile: async (input: Partial<CreateUserInputState>) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Update failed");
        }
      },

      // Fetch All Users
      fetchAllUsers: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/all-users`);
          if (response.data.success) {
            set({ allUsers: response.data.allUsers, loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Fetching users failed");
          set({ loading: false });
        }
      },

      // Update Users
      updateUsers: async (input: Partial<CreateUserInputState>) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/update-users`,
            input,
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            await get().fetchAllUsers();
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Updating users failed");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);