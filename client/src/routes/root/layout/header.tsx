import { Button } from "@/components/ui/button"
import UserButton from "@/components/user-button"
import { Sidebar as SidebarIcon } from "lucide-react"
import { Link } from "react-router-dom"
import SearchForm from "./search-form"
import { useSidebarStore } from "@/store/use-sidebar"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

function Header() {
    const sidebarStore = useSidebarStore();
    const { isMobile } = useMobile();
    return (
        <div className={cn('h-16 w-full bg-background border border-border rounded-xs px-4',
            !isMobile && 'pl-64'
        )}>
            <div className="flex h-full items-center">
                <div className="flex items-center gap-2">
                    <Button onClick={() => {
                        if (sidebarStore.isOpen) {
                            sidebarStore.close();
                        } else {
                            sidebarStore.open();
                        }
                    }} type="button" size={"icon"} variant={"ghost"} className="cursor-pointer">
                        <SidebarIcon className="w-6 h-6" />
                    </Button>
                    <Link to="/" className="font-medium text-base">
                        Taskify
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <SearchForm />
                </div>
                <div className="ms-auto">
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Header