import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { MedicineType } from "./index.types";
import useDeleteMedicine from "./useDeleteMedicine";
import SyncLoader from "@/components/ui/loaders/SyncLoader";

interface DeleteModalProps {
  medicineData: MedicineType;
  open: boolean;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  medicineData,
  open,
  onClose,
}) => {
  const { deleteMedicine, isDeleting } = useDeleteMedicine();

  const deleteMedicineHandler = () => {
    deleteMedicine(medicineData._id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent onEscapeKeyDown={onClose} className="text-right">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-x-1 font-semibold">
            <Trash className="size-4" />
            حذف محصول
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            آیا از حذف محصول{" "}
            <span className="font-semibold underline text-primary">
              {medicineData.name}
            </span>{" "}
            اطمینان خاطر دارید؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center gap-x-3">
          <AlertDialogCancel
            disabled={isDeleting}
            className="w-24"
            onClick={onClose}
          >
            لغو
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            className="w-24"
            onClick={deleteMedicineHandler}
          >
            {isDeleting ? <SyncLoader size={5} /> : "تایید"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
