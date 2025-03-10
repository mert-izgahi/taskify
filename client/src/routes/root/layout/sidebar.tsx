import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { Tab } from "@/lib/types";
import { cn } from "@/lib/utils"
import { useSidebarStore } from "@/store/use-sidebar"
import { useTabsStore } from "@/store/use-tabs";
import { Calendar as TodayIcon, Home as HomeIcon, Grid as UpcomingIcon, Plus, CheckCircle as CompleteIcon } from "lucide-react";



function SidebarItem({ icon: Icon, label, tab }: { icon: any, label: string, tab: Tab }) {
    const tabsStore = useTabsStore();

    return (
        <div onClick={() => tabsStore.setActiveTab(tab)} className={cn("flex items-center gap-2 px-4 py-2 rounded-xs hover:bg-muted cursor-pointer",
            tabsStore.activeTab === tab && "bg-muted border border-border"
        )}>
            <Icon className="w-4 h-4" />
            <span className="font-medium text-sm">{label}</span>
        </div>
    )
}

function Sidebar() {
    const sidebarStore = useSidebarStore();
    const { isMobile } = useMobile();

    const items = [
        { icon: HomeIcon, label: "Home", tab: "home" },
        { icon: TodayIcon, label: "Today", tab: "today" },
        { icon: UpcomingIcon, label: "Upcoming", tab: "upcoming" },
        { icon: CompleteIcon, label: "Completed", tab: "completed" },
    ]

    return (
        <>
            {/* SidebarOverlay */}
            {
                sidebarStore.isOpen && isMobile && <div className="fixed inset-0 z-40 bg-black/20 bg-opacity-50 backdrop-blur-sm"
                    onClick={sidebarStore.close}
                ></div>
            }

            {/* Sidebar */}
            <div className={cn("fixed top-0 bottom-0 z-50 w-64 left-0 bg-background transform transition-transform duration-300 ease-in-out",
                sidebarStore.isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="w-full h-full flex flex-col">
                    <div className="h-16 flex items-center px-4">
                        <h1 className="font-medium text-lg">Tasks</h1>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col h-full">
                            {/* SidebarItems */}
                            <div className="flex flex-col gap-4 p-4">
                                {items.map((item, index) => (
                                    <SidebarItem key={index} icon={item.icon} label={item.label} tab={item.tab as Tab} />
                                ))}
                            </div>

                            <div className="flex flex-col overflow-y-auto">
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="px-4 flex items-center justify-between">
                                        <h2 className="font-medium text-sm">Tags</h2>
                                        <Button size={"icon"} variant={"ghost"} className="cursor-pointer">
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Sidebar