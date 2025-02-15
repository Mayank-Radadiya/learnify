"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarRoutes } from "@/constant";
import { cn } from "@/lib/utils";
import { DialogContent } from "@radix-ui/react-dialog";
import { Compass, Layout, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MobilSidebarProps {}

const MobilSidebar = ({}: MobilSidebarProps) => {
  const { open } = useSidebar();
  const pathname = usePathname();
  return (
    <>
      {" "}
      <Sheet>
        <SheetTrigger className="md:hidden hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>

        <SheetContent side="left" className="p-2">
          <SheetTitle>
            <div className="m-3 flex items-center">
              <Image src="logo.svg" width={30} height={30} alt="logo" />
              <h1 className="text-xl font-bold pl-3">Learnify</h1>
            </div>
          </SheetTitle>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarRoutes.map((route) => (
                <SidebarMenuItem key={route.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={route.link}
                      className={cn(
                        {
                          "!bg-primary !text-white":
                            pathname === route.link ||
                            pathname.startsWith(`${route.link}/`),
                        },
                        "mb-1 list-none"
                      )}
                    >
                      {route.icon == "compass" ? <Compass /> : <Layout />}
                      {open && <span>{route.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobilSidebar;
