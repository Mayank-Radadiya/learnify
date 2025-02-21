import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { warn } from "console";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 rounded-md text-sm flex item-center w-full",
  {
    variants: {
      variant: {
        warning:
          "border-yellow-200/80  border-yellow-30 bg-yellow-100 dark:bg-yellow-200/75 dark:text-black",
        success:
          "border-emerald-200/80 border-emerald-30 bg-emerald-100 dark:bg-emerald-200/75 dark:text-black",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />,
  success: <CheckCircleIcon className="h-5 w-5 mr-2 text-emerald-500" />,
};

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      {Icon} {label}
    </div>
  );
};

export default Banner;
