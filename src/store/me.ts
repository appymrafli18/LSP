import { USER } from "@/types/user";
import axios from "axios";
import { create } from "zustand";

interface IUserState {
  user: USER | null;
  loading: boolean;
  setUser: () => void;
}

const useMe = create<IUserState>((set) => ({
  user: null,
  loading: false,
  setUser: async () => {
    set({ loading: true });
    await axios
      .get("/api/user/me")
      .then((res) => {
        set({ user: res.data.data });
      })
      .catch(() => {
        set({ user: null });
      })
      .finally(() => set({ loading: false }));
  },
}));

export default useMe;
