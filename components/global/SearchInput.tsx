"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-Debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { title } from "process";

const SearchInput = ({}) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const searchParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParam.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedSearch,
      },
    },{skipEmptyString: true, skipNull: true});

    router.push(url);
  }, [debouncedSearch, currentCategoryId ,pathname, router]);

  return (
    <>
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3  text-slate-300" />
        <Input
          className="pl-9 w-full md:w-[300px] rounded-md focus-visible:ring-slate-500"
          placeholder="Search for a Course"
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchInput;
