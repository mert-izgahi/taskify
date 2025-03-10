import { useAuthStore } from "@/store/use-auth"
import { Navigate, Outlet } from "react-router-dom"
import Header from "./header";
import Sidebar from "./sidebar";
import { useSidebarStore } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";
import Modal from "@/components/modal";
import { useModalStore } from "@/store/use-modal";
import TagForm from "@/components/tag-form";
import { useTagsStore } from "@/store/use-tags";

const Layout = () => {
    const { isAuthenticated, data } = useAuthStore();
    const sidebarStore = useSidebarStore();
    const modalStore = useModalStore();
    const tagsStore = useTagsStore();
    const { isMobile } = useMobile();

    useEffect(() => {
        if (isMobile) {
            sidebarStore.close();
        } else {
            sidebarStore.open();
        }
    }, [isMobile]);




    if (!isAuthenticated || !data) {
        return <Navigate to="/auth/sign-in" replace={true} />
    }

    return <div className="bg-muted min-h-screen w-screen">
        <Sidebar />
        {/* HEADER */}
        <Header />
        <div className="flex flex-col min-h-screen max-w-5xl mx-auto">
            {/* MAIN */}

            <main className="flex-1 p-4">
                <Outlet />
                <Modal title={tagsStore.mode === "create" ? "Create Tag" : "Update Tag"} description={tagsStore.mode === "create" ? "Create a new tag" : "Update a tag"} isOpen={modalStore.isOpen} close={modalStore.close}>
                    <TagForm />
                </Modal>
            </main>
        </div>
    </div>
}

export { Layout as RootLayout }