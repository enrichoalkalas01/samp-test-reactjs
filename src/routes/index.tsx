import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";

import { useAuthStore } from "../zustand/userStore";

import Login from "../pages/users/login";
import Register from "../pages/users/register";
import Dashboard from "../pages/dashboards";
import NotFound from "../pages/notfound";
import ProductPage from "../pages/dashboards/products/product-page";
import ProductDetail from "../pages/dashboards/products/product-detail";
import ProductCreate from "../pages/dashboards/products/product-create";
import ProductUpdate from "../pages/dashboards/products/product-update";
import LayoutDashboard from "../components/layouts/layout-dashboard";

// interface PropsRouter {
//     children: ReactNode
// }

// Public Route Wrapper ( hanya untuk access yang sudah authenticate )
const PrivateRoute = () => {
    const { authStatus } = useAuthStore()
    return authStatus ? <Outlet /> : <Navigate to="/login" />;
}

// Public Route Wrapper ( hanya untuk access yang tidak authenticate )
const PublicRoute = () => {
    const { authStatus } = useAuthStore()
    return authStatus ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default function RouterApp() {
    return(
        <>
            <Router>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<LayoutDashboard />}>
                            <Route index element={<Dashboard />} />
                            <Route path="products" element={<ProductPage />} />
                            <Route path="products/create" element={<ProductCreate />} />
                            <Route path="products/:id/update" element={<ProductUpdate />} />
                            <Route path="products/:id" element={<ProductDetail />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    )
}