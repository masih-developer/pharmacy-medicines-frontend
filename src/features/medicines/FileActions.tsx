import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleAlert, Trash, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import useUploadMedicinesFile from "./useUploadMedicinesFile";
import toast from "react-hot-toast";
import { useState } from "react";

interface RhfType {
  excel: File[] | null;
}

const FileActions = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<RhfType>();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { uploadFile, isUploading } = useUploadMedicinesFile();

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitFormHandler = ({ excel }: RhfType) => {
    const formData = new FormData();
    formData.append("excel", excel![0]);

    uploadFile(formData, {
      onSuccess: (data) => {
        toast.success(data.message || "عملیات با موفقیت انجام شد.");
        reset();
        onCloseModal();
      },
    });
  };

  return (
    <Dialog open={isOpenModal}>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-x-2"
        onClick={() => setIsOpenModal(true)}
      >
        <Upload className="size-4" />
        بارگذاری فایل
      </Button>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={onCloseModal}
        onEscapeKeyDown={onCloseModal}
        onCloseAutoFocus={onCloseModal}
      >
        <DialogHeader className="flex flex-col gap-y-1">
          <DialogTitle className="flex items-center gap-x-2">
            <Upload className="size-4" />
            بارگذاری فایل
          </DialogTitle>
          <DialogDescription className="text-right">
            تنها فایل با{" "}
            <span className="font-semibold text-primary">
              پسوند xlsx (فرمت اکسل)
            </span>{" "}
            قابل بارگذاری می‌باشد.
          </DialogDescription>
        </DialogHeader>
        <form className="" onSubmit={handleSubmit(submitFormHandler)}>
          <label htmlFor="excel-file">
            <div
              className={`w-full h-40 border-2 border-dashed flex items-center justify-center flex-col gap-y-2 rounded-md cursor-pointer ${
                errors.excel
                  ? "border-destructive text-destructive"
                  : "border-primary"
              }`}
            >
              <span
                className={`flex items-center justify-center rounded-full p-2 ${
                  errors.excel ? "bg-destructive/20" : "bg-primary/15"
                }`}
              >
                <Upload className="size-6" />
              </span>
              <span className="text-inherit">بارگذاری فایل</span>
            </div>
          </label>
          <input
            type="file"
            className="hidden"
            id="excel-file"
            {...register("excel", {
              required: "فایل مدنظر خود را انتخاب کنید!",
              validate: (value) => {
                if (value![0].name?.split(".")[1] !== "xlsx") {
                  return "فقط مجاز به انتخاب فرمت xlsx. می باشید!";
                }
                return true;
              },
            })}
          />
          {errors.excel && (
            <span className="text-sm mt-2 block text-destructive">
              {errors.excel.message}
            </span>
          )}
          {watch("excel") !== null && watch("excel")?.length ? (
            <ul className="flex flex-col gap-y-2 mt-5">
              {Array.from(watch("excel")!).map((item) => (
                <li
                  className="flex overflow-hidden items-center justify-between rounded-md bg-[#0a7641] text-primary-foreground dark:text-primary dark:bg-[#0a7641]"
                  key={item.name}
                >
                  <Button
                    variant="default"
                    className="p-0 size-10 border-l border-l-primary-foreground dark:border-l-primary rounded-none bg-[#0a7641] hover:bg-destructive"
                    onClick={() => setValue("excel", null)}
                  >
                    <Trash className="size-4 text-primary-foreground dark:text-primary" />
                  </Button>
                  <span className="ltr ml-3 text-sm text-primary-foreground dark:text-primary">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : undefined}
          <Button type="submit" className="w-full mt-5" disabled={isUploading}>
            {isUploading ? "در حال بارگذاری..." : "بارگذاری"}
          </Button>
          {isUploading && (
            <div className="text-center flex gap-x-1 items-center justify-center text-sm text-primary mt-1">
              <CircleAlert className="size-4" />
              <span>
                این عملیات ممکن است چند دقیقه طول بکشد، لطفا منتظر بمانید.
              </span>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileActions;
