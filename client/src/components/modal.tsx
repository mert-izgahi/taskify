import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

interface ModalProps {
    title: string
    description: string
    isOpen: boolean
    close: () => void
    children?: React.ReactNode
}

function Modal({ title, description, isOpen, children, close }: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal