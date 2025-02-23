"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryItemProps {
  label: string;
  icon?: IconType;
  value?: string;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategory === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? undefined : value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  return (
    <>
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:bg-slate-100 transition mb-4 hover:border-slate-700 shadow-sm",
        isSelected && "bg-blue-200 border-sky-600 hover:bg-blue-300"
      )}
      type="button"
    >
      {Icon && <Icon className="mr-2" />}
      <div className="truncate">{label}</div>
    </button>
    </>
  );
};

export default CategoryItem;
