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

interface ActionFormType {
  medicineData: MedicineType;
  isEditMode?: boolean;
}

const ActionForm: React.FC<ActionFormType> = ({ medicineData, isEditMode }) => {
  const form = useForm<z.infer<typeof medicineValidationSchema>>({
    defaultValues: {
      name: isEditMode ? medicineData.name : "",
      code: isEditMode ? medicineData.code : 0,
      expire: isEditMode
        ? new Date(medicineData.expire).toISOString()
        : new Date().toISOString(),
      price: isEditMode ? medicineData.price : 0,
      quantity: isEditMode ? medicineData.quantity : 0,
      type: isEditMode ? medicineData.type : "",
    },
    resolver: zodResolver(medicineValidationSchema),
  });

  const onSubmit = (values: z.infer<typeof medicineValidationSchema>) => {
    console.log(values);
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
                    field.onChange(value === "" ? "" : parseFloat(value));
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
                    field.onChange(value === "" ? "" : parseFloat(value));
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
                    field.onChange(value === "" ? "" : parseFloat(value));
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
          {isEditMode ? "ثبت تغییرات" : "ایجاد محصول"}
        </Button>
      </form>
    </Form>
  );
};

export default ActionForm;
