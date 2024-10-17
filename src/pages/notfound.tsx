import { useAuthStore } from "../zustand/userStore"

export default function NotFound() {
    const { authStatus } = useAuthStore()
    if ( authStatus ) {
        setTimeout(() => { window.location.href = "/dashboard" }, 2000)
    }

    if ( !authStatus ) {
        setTimeout(() => { window.location.href = "/login" }, 2000)
    }

    return(
        <>
            NotFound Page Here
        </>
    )
}