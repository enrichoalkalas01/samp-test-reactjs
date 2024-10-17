import { create } from "zustand";
import UniversalCookie from "universal-cookie";

const cookies = new UniversalCookie(null, { path: '/' });
const refreshToken = cookies.get("__rft");
// const userData = cookies.get("__usd");

interface PropsAuthStore {
    authStatus: boolean;
    setAuthStatus: (status: boolean) => void;
}

export const useAuthStore = create<PropsAuthStore>((set) => ({
    authStatus: refreshToken ? true : true,
    setAuthStatus: (status: boolean) => set({ authStatus: status }),
}));

interface PropsUserStore {
    username: string,
    fullname: string,
}

export const useUserStore = create<PropsUserStore>(() => ({
    username: "enricho",
    fullname: "enricho"
}))
