import type { Metadata } from "next";
import "../globals.css";
import { Footer, Header } from "@/components";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Dashboard | Lens Reputation",
  description: "Reputation system for users based on their activity",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Toaster />
      {children}
      <Footer />
    </>
  );
}
