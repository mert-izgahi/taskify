import { useAuthStore } from "@/store/use-auth"
import { Navigate, Outlet } from "react-router-dom"
import Header from "./header";

const Layout = () => {
    const { isAuthenticated, data } = useAuthStore();

    if (!isAuthenticated || !data) {
        return <Navigate to="/auth/sign-in" replace={true} />
    }

    return <div className="bg-muted min-h-screen w-screen">
        <div className="flex flex-col min-h-screen max-w-5xl mx-auto">
            {/* HEADER */}
            <Header />
            {/* MAIN */}

            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    </div>
}

export { Layout as RootLayout }