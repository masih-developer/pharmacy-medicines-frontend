import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useSearchParams } from "react-router-dom";

interface DropDownItemProps {
  key: string;
  value: string;
  label: string;
}

const DROPDOWN_ITEMS: DropDownItemProps[] = [
  { key: "expire", value: "nearest", label: "نزدیک ترین تاریخ انقضا" },
  { key: "expire", value: "latest", label: "دیرترین تاریخ انقضا" },
  { key: "price", value: "maximum", label: "بیشترین قیمت" },
  { key: "price", value: "minimum", label: "کمترین قیمت" },
  { key: "quantity", value: "maximum", label: "بیشترین موجودی" },
  { key: "quantity", value: "minimum", label: "کمترین موجودی" },
  { key: "code", value: "maximum", label: "کد کالای بزرگتر" },
  { key: "code", value: "minimum", label: "کد کالای کوچکتر" },
];

const SortingDropDown = () => {
  const location = useLocation();
  const webSearchParams = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckedChange = (key: string, value: string) => {
    const currentValue = webSearchParams[key]?.trim();
    if (currentValue === value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">مرتب سازی</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>فیلتر مد نظر خود را انتخاب کنید</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {DROPDOWN_ITEMS.map(({ key, value, label }) => (
          <DropdownMenuCheckboxItem
            key={label}
            checked={Boolean(webSearchParams[key]?.trim() === value)}
            onCheckedChange={() => handleCheckedChange(key, value)}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortingDropDown;
