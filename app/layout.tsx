import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import ConfettiProvider from "@/components/global/ConfettiProvider";

export const metadata: Metadata = {
  title: "Learnify",
  description:
    "An interactive learning platform designed to enhance your skills effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClerkProvider>
          <ConfettiProvider />
          <Toaster />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
