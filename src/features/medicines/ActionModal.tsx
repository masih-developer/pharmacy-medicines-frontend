import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { ClipboardPlus, Pencil, X } from "lucide-react";
import { PropsWithChildren } from "react";

interface ActionModalType {
  modalMode: "create" | "edit";
  open: boolean;
  onClose: () => void;
}

const ActionModal: React.FC<PropsWithChildren<ActionModalType>> = ({
  open,
  onClose,
  modalMode,
  children,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[450px] overflow-y-auto sm:max-h-[calc(100vh-2rem)]"
        onInteractOutside={onClose}
        onEscapeKeyDown={onClose}
        onCloseAutoFocus={onClose}
      >
        <DialogHeader className="flex items-center">
          <div className="flex items-center gap-x-2 font-semibold w-full">
            {modalMode === "create" ? (
              <>
                <ClipboardPlus />
                ایجاد محصول جدید
              </>
            ) : (
              <>
                <Pencil className="size-4" />
                ویرایش محصول
              </>
            )}
          </div>
        </DialogHeader>
        {children}
        <DialogClose
          className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label="Close"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ActionModal;
