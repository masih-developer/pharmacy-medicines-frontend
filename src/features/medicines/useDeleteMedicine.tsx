import { CustomAxiosError } from "@/services";
import { deleteMedicineApi } from "@/services/medicineService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteMedicine = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMedicine, isPending: isDeleting } = useMutation({
    mutationFn: deleteMedicineApi,
    onSuccess: (res: { message: string }) => {
      console.log(res);
      toast.success(res.message || "عملیات با موفقیت انجام شد.");
      return queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    onError: (error: CustomAxiosError) => {
      toast.error(
        error.response?.data.message || "اعمال تغییرات با خطا مواجه شد.",
      );
    },
  });

  return { deleteMedicine, isDeleting };
};

export default useDeleteMedicine;
