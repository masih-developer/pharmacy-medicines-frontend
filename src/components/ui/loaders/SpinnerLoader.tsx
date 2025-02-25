import { cn } from "@/lib/utils";

const SpinnerLoader = ({
  className,
}: Pick<React.HTMLAttributes<HTMLDivElement>, "className">) => {
  return (
    <div
      className={cn(
        "size-16 animate-spin rounded-full border-4 border-border border-r-border/30",
        className,
      )}
    />
  );
};

export default SpinnerLoader;
