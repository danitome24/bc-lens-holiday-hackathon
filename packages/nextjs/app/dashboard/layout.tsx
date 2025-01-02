import type { Metadata } from "next";
import "../globals.css";
import { Footer, Header } from "@/components";

export const metadata: Metadata = {
  title: "Dashboard | LensSocialScore dashboard",
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
      {children}
      <Footer />
    </>
  );
}
