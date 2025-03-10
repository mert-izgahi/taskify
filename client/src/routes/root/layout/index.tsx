import UserButton from "@/components/user-button"
import { useAuthStore } from "@/store/use-auth"
import { Navigate, Outlet } from "react-router-dom"

const Layout = () => {
    const { isAuthenticated, data } = useAuthStore();

    if (!isAuthenticated || !data) {
        return <Navigate to="/auth/sign-in" replace={true} />
    }

    return <>
        <UserButton />
        <Outlet />
    </>
}

export { Layout as RootLayout }