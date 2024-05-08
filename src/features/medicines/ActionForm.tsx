import { MedicineType } from "./index.types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { medicineValidationSchema } from "@/validators/medicines";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { DateObject } from "react-multi-date-picker";
import useUpdateMedicine from "./useUpdateMedicine";
import SyncLoader from "@/components/ui/loaders/SyncLoader";
import useCreateMedicine from "./useCreateMedicine";

type ActionFormType =
  | {
      modalMode: "edit";
      medicineData: MedicineType;
      onClose: () => void;
    }
  | {
      modalMode: "create";
      onClose: () => void;
    };

const ActionForm: React.FC<ActionFormType> = (props) => {
  const form = useForm<z.infer<typeof medicineValidationSchema>>({
    defaultValues: {
      name: props.modalMode === "edit" ? props.medicineData.name : "",
      code: props.modalMode === "edit" ? props.medicineData.code : 0,
      expire:
        props.modalMode === "edit"
          ? new Date(props.medicineData.expire).toISOString()
          : new Date().toISOString(),
      price: props.modalMode === "edit" ? props.medicineData.price : 0,
      quantity: props.modalMode === "edit" ? props.medicineData.quantity : 0,
      type: props.modalMode === "edit" ? props.medicineData.type : "",
    },
    resolver: zodResolver(medicineValidationSchema),
  });
  const { updateMedicine, isUpdating } = useUpdateMedicine();
  const { createMedicine, isCreating } = useCreateMedicine();

  const onSubmit = (values: z.infer<typeof medicineValidationSchema>) => {
    if (props.modalMode === "edit") {
      updateMedicine(
        { id: props.medicineData._id, medicine: values },
        {
          onSuccess: () => {
            props.onClose();
          },
        }
      );
    } else {
      createMedicine(values, {
        onSuccess: () => {
          props.onClose();
          form.reset();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام کالا:</FormLabel>
              <FormControl>
                <Input placeholder="نام کالا را وارد کنید." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد کالا:</FormLabel>
              <FormControl>
                <Input
                  placeholder="کد کالا را وارد کنید."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === ""
                        ? ""
                        : isNaN(+value)
                        ? value
                        : parseInt(value)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت کالا:</FormLabel>
              <FormControl>
                <Input
                  placeholder="قیمت کالا را وارد کنید."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === ""
                        ? ""
                        : isNaN(+value)
                        ? value
                        : parseInt(value)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>موجودی کالا:</FormLabel>
              <FormControl>
                <Input
                  placeholder="موجودی کالا را وارد کنید."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === ""
                        ? ""
                        : isNaN(+value)
                        ? value
                        : parseInt(value)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع کالا:</FormLabel>
              <FormControl>
                <Input placeholder="نوع کالا را وارد کنید." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expire"
          render={({ field: { value, onChange } }) => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>تاریخ انقضا کالا:</FormLabel>
              <FormControl>
                <DatePicker
                  value={new Date(value) || ""}
                  onChange={(date) => {
                    onChange(date?.isValid ? new Date(date) : "");
                  }}
                  inputClass="w-full"
                  minDate={new DateObject()}
                  format="YYYY/MM/DD"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isUpdating || isCreating ? (
            <SyncLoader />
          ) : props.modalMode === "edit" ? (
            "ثبت تغییرات"
          ) : (
            "ایجاد محصول"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ActionForm;
