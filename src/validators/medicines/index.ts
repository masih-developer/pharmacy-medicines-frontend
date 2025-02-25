import { z } from "zod";

// Custom validator for ISO date format
const isoDate = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    "فرمت تاریخ وارد شده می بایست به فرمت  ISO باشد.",
  );

// Custom validator for minimum date
const minDate = z
  .date()
  .min(new Date(), "حداقل تاریخ انقضا امروز است.")
  .transform((val) => new Date(val).toISOString());

export const medicineValidationSchema = z.object({
  name: z.string().min(1, "نام محصول می بایست حداقل 1 کاراکتر باشد."),
  expire: z.union([minDate, isoDate]),
  code: z.number({ message: "کد کالا می بایست یک مقدار عددی باشد!" }),
  quantity: z.number({ message: "موجودی کالا می بایست یک مقدار عددی باشد!" }),
  price: z
    .number({ message: "قیمت کالا می بایست یک مقدار عددی باشد!" })
    .min(0, "قیمت محصول می بایست عددی مثبت باشد!"),
  type: z.string().min(1, "نوع محصول می بایست حداقل 1 کاراکتر باشد."),
});
