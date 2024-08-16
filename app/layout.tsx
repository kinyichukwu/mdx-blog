import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/navigation/SideBar";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navigation/NavBar";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="flex">
          <SideBar className="max-md:hidden" />
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
