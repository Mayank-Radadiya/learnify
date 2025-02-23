"use client";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const pathname = usePathname();

  const isSearchPage = pathname?.includes("/search");

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="ml-auto gap-5 items-center flex">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              {" "}
              <LogOut className="h-4 w-4 mr-2" />
              Exit{" "}
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/course">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        )}
        <ThemeToggle />
        <UserButton />
      </div>
    </>
  );
};

export default Navbar;
