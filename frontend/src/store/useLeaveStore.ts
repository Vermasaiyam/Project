import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { LeavePolicyInputState } from "@/schema/leaveSchema";
import { toast } from "sonner";

const API_END_POINT = import.meta.env.VITE_API_END_POINT_LEAVE || "http://localhost:3000/api/leave";
axios.defaults.withCredentials = true;

type LeavePolicyState = {
  leavePolicy: LeavePolicyInputState | null;
  loading: boolean;

  createLeavePolicy: (input: LeavePolicyInputState) => Promise<void>;
  updateLeavePolicy: (input: LeavePolicyInputState) => Promise<void>;
  getLeavePolicy: () => Promise<void>;
};

export const useLeavePolicyStore = create<LeavePolicyState>()(
  persist(
    (set, _) => ({
      leavePolicy: null,
      loading: false,

      // Create Leave Policy
      createLeavePolicy: async (input: LeavePolicyInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/create`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ leavePolicy: response.data.leavePolicy });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to create leave policy");
        } finally {
          set({ loading: false });
        }
      },

      // Update Leave Policy
      updateLeavePolicy: async (input: LeavePolicyInputState) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/update`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ leavePolicy: response.data.leavePolicy });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to update leave policy");
        } finally {
          set({ loading: false });
        }
      },

      // Get Leave Policy
      getLeavePolicy: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            set({ leavePolicy: response.data.leavePolicy });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to fetch leave policy");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "leave-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
