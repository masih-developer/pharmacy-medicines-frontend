import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const TopBar = () => {
  const { setTheme } = useTheme();

  return (
    <nav className="p-2 border-b border-b-border">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold">امیر حجتی</span>
        </div>
        <div className="flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                روشن
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                تیره
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                پیشفرض سیستم
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex text-sm h-10 px-3 rounded-md items-center gap-x-2 border-border border bg-secondary">
            <span className="">تاریخ:</span>
            <span className="">
              {new Date().toLocaleString("fa-ir").split(",")[0]}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
