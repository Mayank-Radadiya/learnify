import { BarChart, Compass, Layout, List } from "lucide-react";

// Remove icon imports from server-side file
export const sidebarRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    link: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    link: "/search",
  },
];

export const teacherRoute = [
  {
    icon: List,
    label: "Course",
    link: "/teacher/course",
  },
  {
    icon: BarChart,
    label: "Analytics",
    link: "/teacher/analytics",
  },
];
