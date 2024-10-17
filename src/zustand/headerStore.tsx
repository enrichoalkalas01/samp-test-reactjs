import { create } from "zustand"
import UniversalCookie from "universal-cookie";

const cookies = new UniversalCookie(null, { path: '/' });
const token = cookies.get("__act");
const base_url_api = import.meta.env.VITE_API_URL || "http://localhost:5600/api/v1"
const base_url_assets = import.meta.env.VITE_API_ASSETS || "http://localhost:5600"

interface PropsHeaderStore {
    base_url_api: string,
    base_url_assets: string,
    token: string | null,
}

export const useHeaderStore = create<PropsHeaderStore>(() => ({
    base_url_api: base_url_api,
    base_url_assets: base_url_assets,
    token: token
}))

interface PropsSearchStore {
    query: string,
    page: number,
    size: number,
    total: number,
    setSearch: ({ query, page, size }: { query:string, page: number, size: number }) => void;
    setTotal: ({ total }: { total: number }) => void;
}

export const useSearchStore = create<PropsSearchStore>((set) => ({
    query: "",
    page: 1,
    size: 3,
    total: 0,
    setSearch: ({ query, page, size }: { query:string, page: number, size: number }) => set({
        query: query,
        page: page,
        size: size,
    }),
    setTotal: ({ total }: { total: number }) => set({
        total: Number(total) || 0,
    }),
}))