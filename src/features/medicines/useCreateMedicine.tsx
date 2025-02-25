import { CustomAxiosError } from "@/services";
import { createMedicineApi } from "@/services/medicineService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  const { mutate: createMedicine, isPending: isCreating } = useMutation({
    mutationFn: createMedicineApi,
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

  return { createMedicine, isCreating };
};

export default useCreateMedicine;
