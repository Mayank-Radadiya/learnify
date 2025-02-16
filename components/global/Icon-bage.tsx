import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconBadgeVariants = cva("rounded-full flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-sky-200 text-sky-700",
      success: "bg-emerald-100 text-emerald-700",
      error: "bg-red-100 text-red-700",
      warning: "bg-yellow-100 text-yellow-700",
      info: "bg-blue-100 text-blue-700",
      dark: "bg-gray-800 text-white",
      light: "bg-gray-100 text-gray-700",
    },
    size: {
      default: "p-2 w-8 h-8",
      lg: "p-3 w-12 h-12",
      md: "p-2 w-10 h-10",
      sm: "p-1 w-6 h-6",
      xs: "p-0.5 w-4 h-4",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    border: {
      none: "",
      thin: "border border-gray-300",
      thick: "border-2 border-gray-500",
      primary: "border border-sky-500",
      success: "border border-emerald-500",
      error: "border border-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    shadow: "none",
    border: "none",
  },
});

type IconBadgeProps = VariantProps<typeof iconBadgeVariants> & {
  icon: LucideIcon;
};

export const IconBadge = ({
  icon: Icon,
  variant,
  size,
  shadow,
  border,
}: IconBadgeProps) => {
  return (
    <div className={cn(iconBadgeVariants({ variant, size, shadow, border }))}>
      <Icon className="w-full h-full" />
    </div>
  );
};
