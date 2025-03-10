import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useMobile } from "@/hooks/use-mobile";
import { Tab } from "@/lib/types";
import { cn } from "@/lib/utils"
import { useModalStore } from "@/store/use-modal";
import { useSidebarStore } from "@/store/use-sidebar"
import { useTabsStore } from "@/store/use-tabs";
import { useTagsStore } from "@/store/use-tags";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Calendar as TodayIcon, Home as HomeIcon, Grid as UpcomingIcon, Plus, CheckCircle as CompleteIcon, Ellipsis, Trash2, Pencil } from "lucide-react";
import { useEffect } from "react";



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
    const modalStore = useModalStore();
    const tagsStore = useTagsStore();
    const items = [
        { icon: HomeIcon, label: "Home", tab: "home" },
        { icon: TodayIcon, label: "Today", tab: "today" },
        { icon: UpcomingIcon, label: "Upcoming", tab: "upcoming" },
        { icon: CompleteIcon, label: "Completed", tab: "completed" },
    ]

    useEffect(() => {
        tagsStore.getAllTags();
    }, [])

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
                                        <Button type="button" size={"icon"} variant={"ghost"} className="cursor-pointer" onClick={modalStore.open}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="flex flex-col gap-2 p-4">
                                        {
                                            tagsStore.isLoading && <>
                                                {
                                                    [...Array(3)].map((_, index) => (
                                                        <Skeleton key={index} className="px-4 py-2 rounded-xs h-10" />
                                                    ))
                                                }
                                            </>
                                        }

                                        {
                                            tagsStore.data && tagsStore.data.length > 0 && tagsStore.data.map((tag, index) => (
                                                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-xs hover:bg-muted cursor-pointer">
                                                    <div className="w-4 h-4 rounded-xs" style={{ backgroundColor: tag.color }}></div>
                                                    <span className="font-medium text-sm">{tag.name}</span>

                                                    <div className="ms-auto">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button type="button" size={"icon"} variant={"ghost"} className="cursor-pointer">
                                                                    <Ellipsis className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>

                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                                                                    tagsStore.setSelectedTag(tag);
                                                                    tagsStore.setMode("update");
                                                                    modalStore.open();
                                                                }}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    <span>Edit</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer" onClick={() => tagsStore.deleteTag(tag._id)}>
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    <span>Delete</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            ))
                                        }
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