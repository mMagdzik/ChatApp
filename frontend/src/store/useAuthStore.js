import { create } from "zustand";
import { axiosInstance } from "../../lib/axios.js";

export const useAuthStore = create((set) => ({
  //initial state
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  //właśnie sprawdzamy, czy użytkownik jest zalogowany
  checkAuth: async () => {
    try {
      //sending reruest to endpoint
      const res = await axiosInstance("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      //user is not authenticated
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      // Czyli: Już sprawdziliśmy, koniec ładowania, możemy np. pokazać UI.
      set({ isCheckingAuth: false });
    }
  },
}));
