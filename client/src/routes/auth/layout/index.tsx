import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return <div className="w-screen min-h-screen flex items-center justify-center">
        <Card className="rounded-xs shadow-none">
            <CardHeader>
                <CardTitle className="font-medium text-xl">Taskify</CardTitle>
                <CardDescription>
                    Manage your tasks with ease and efficiency
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Outlet />
            </CardContent>
        </Card>
    </div>
}

export { Layout as AuthLayout }