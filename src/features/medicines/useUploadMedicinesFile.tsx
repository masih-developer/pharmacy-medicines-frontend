import { uploadExcelFileApi } from "@/services/medicineService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUploadMedicinesFile = () => {
  const queryclient = useQueryClient();

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: uploadExcelFileApi,
    onSuccess: () => {
      return queryclient.invalidateQueries({ queryKey: ["medicines"] });
    },
  });

  return { uploadFile, isUploading };
};

export default useUploadMedicinesFile;
