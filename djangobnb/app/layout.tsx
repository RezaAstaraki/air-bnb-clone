import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

import NextProvider from "@/redux/NextProvider";
import LoginModal from "./components/modals/LoginModal";
import SingUpModal from "./components/modals/SignUpModal";
import AddPropertyModal from "./components/modals/AddPropertyModal";
import AdvanceSearch from "./components/modals/AdvanceSearch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DjangoBnb",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className="pt-32">{children}</div>
          <SingUpModal />
          <AddPropertyModal />
          <LoginModal />
          <AdvanceSearch />
        </body>
      </html>
    </NextProvider>
  );
}
