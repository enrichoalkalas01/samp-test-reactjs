import { Outlet } from "react-router-dom"

import NavbarDashboard from "../headers/navbar-dashboard"

export default function LayoutDashboard() {
    return(
        <>
            <section className="w-full">
                {/* Navigation Bar */}
                <section className="w-full">
                    <NavbarDashboard />
                    <section className="py-4 px-4">
                        {/* Outlet adalah pengganti children dari props react-router-dom */}
                        <Outlet />
                    </section>
                </section>
            </section>
        </>
    )
}