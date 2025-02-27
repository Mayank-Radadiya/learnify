import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  variant?: "success" | "default";
  value: number;
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "bg-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};
const ProgressBar = ({ value, variant, size }: ProgressBarProps) => {
  return (
    <>
      <Progress value={value} variant={variant} className="h-2" />
      <p
        className={cn(
          "font-medium mt-2 text-sky-600",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"],
        )}
      >
        {Math.round(value)}% completed{" "}
      </p>
    </>
  );
};

export default ProgressBar;
