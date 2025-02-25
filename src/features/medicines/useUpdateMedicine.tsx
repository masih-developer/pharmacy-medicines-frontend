import { CustomAxiosError } from "@/services";
import { updateMedicineApi } from "@/services/medicineService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  const { mutate: updateMedicine, isPending: isUpdating } = useMutation({
    mutationFn: updateMedicineApi,
    onSuccess: () => {
      toast.success("تغییرات با موفقیت اعمال شد.");
      return queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    onError: (error: CustomAxiosError) => {
      toast.error(
        error.response?.data.message || "اعمال تغییرات با خطا مواجه شد.",
      );
    },
  });

  return { updateMedicine, isUpdating };
};

export default useUpdateMedicine;
