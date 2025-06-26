import { create } from "zustand";

export const useAuthStore = create((set) => ({
  //initial state
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
}));
