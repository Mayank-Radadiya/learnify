import AppSidebar from "./_components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import MobilSidebar from "./_components/MobilSidebar";
import Navbar from "@/components/global/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      {" "}
      <SidebarProvider>
        <AppSidebar />
        <main className="m-2 w-full">
          <div className="flex items-center gap-2 rounded-md bg-sidebar p-2 px-4 shadow">
            <MobilSidebar />
            <Navbar />
          </div>

          <div className="h-4"></div>
          {/* main Content */}
          <div className="h-[calc(100vh-6rem)] overflow-y-scroll rounded-md bg-sidebar p-4 shadow">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
