"use client";
import { sidebarRoutes } from "@/constant";
import Image from "next/image";
import { Compass, Layout } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const { open } = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div
          className={cn("flex items-center justify-between gap-2", {
            "flex-col-reverse": !open,
          })}
        >
          <Link href="/dashboard">
            <Image src="logo.svg" width={40} height={40} alt="logo" />
          </Link>
          {open && <h1 className="text-xl font-bold">Learnify</h1>}
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel> Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarRoutes.map((route) => {
                return (
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
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
