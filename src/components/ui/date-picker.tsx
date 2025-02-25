import ReactMultiDatePicker, {
  CalendarProps,
  DatePickerProps,
} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { cn } from "@/lib/utils";

const DatePicker: React.FC<
  Omit<CalendarProps, "onChange"> & DatePickerProps
> = ({ inputClass, ...rest }) => {
  return (
    <ReactMultiDatePicker
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      {...rest}
      inputClass={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        inputClass,
      )}
    />
  );
};

export default DatePicker;
