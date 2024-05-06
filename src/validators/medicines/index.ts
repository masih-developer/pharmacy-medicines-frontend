import { z } from "zod";

export const medicineValidationSchema = z.object({
  name: z.string().min(1, "نام محصول می بایست حداقل 1 کاراکتر باشد."),
  expire: z
    .date({ message: "تاریخ وارد شده نا معبتر می باشد." })
    .min(new Date(), "حداقل تاریخ انقضا امروز است.")
    .transform((val) => new Date(val).toISOString()),
  code: z.number({ message: "کد کالا می بایست یک مقدار عددی باشد!" }),
  quantity: z.number({ message: "موجودی کالا می بایست یک مقدار عددی باشد!" }),
  price: z
    .number({ message: "قیمت کالا می بایست یک مقدار عددی باشد!" })
    .min(0, "قیمت وارد شده معتبر نمی باشد."),
  type: z.string().min(1, "نوع محصول می بایست حداقل 1 کاراکتر باشد."),
});
