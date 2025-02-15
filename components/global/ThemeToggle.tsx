"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThemeToggleProps {
  initialTheme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
  className?: string;
}

const ThemeToggle = ({
  initialTheme = "light",
  onThemeChange,
  className = "",
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    onThemeChange?.(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`relative rounded-full ${className}`}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
