import { UserType } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SignInSchema, SignUpSchema } from "@/lib/zod";
import axiosInstance from "@/lib/axios";

export interface IAuthStore {
  data: UserType | null;
  error: string | null;
  isAuthenticated: boolean;
  isPending: boolean;
  signIn: (data: SignInSchema) => Promise<void>;
  signUp: (data: SignUpSchema) => Promise<void>;
  signOut: () => Promise<void>;
  updateMe: (data: UserType) => Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      data: null,
      error: null,
      isAuthenticated: false,
      isPending: false,
      signIn: async (data) => {
        try {
          set({ isPending: true });
          const res = await axiosInstance.post("/auth/sign-in", data);
          set({ data: res.data, isAuthenticated: true });
          set({ isPending: false });
        } catch (error: any) {
          const message =
            error.response.data.message ||
            error.message ||
            "Something went wrong";

          set({ isPending: false, error: message });
        } finally {
          set({ isPending: false });
        }
      },
      signUp: async (data) => {
        try {
          set({ isPending: true });
          const res = await axiosInstance.post("/auth/sign-up", data);
          set({ data: res.data, isAuthenticated: true });
          set({ isPending: false });
        } catch (error: any) {
          const message =
            error.response.data.message ||
            error.message ||
            "Something went wrong";

          set({ isPending: false, error: message });
        } finally {
          set({ isPending: false });
        }
      },
      signOut: async () => {
        try {
          await axiosInstance.post("/auth/sign-out");
          set({ data: null, isAuthenticated: false });
        } catch (error: any) {
          const message =
            error.response.data.message ||
            error.message ||
            "Something went wrong";

          set({ isPending: false, error: message });
        } finally {
          set({ isPending: false });
        }
      },
      updateMe: async (data) => {
        try {
          set({ isPending: true });
          const res = await axiosInstance.put("/auth/update-me", data);
          set({ data: res.data, isAuthenticated: true });
          set({ isPending: false });
        } catch (error: any) {
          const message =
            error.response.data.message ||
            error.message ||
            "Something went wrong";

          set({ isPending: false, error: message });
        } finally {
          set({ isPending: false });
        }
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
