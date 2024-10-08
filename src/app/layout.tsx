import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CubeLogo } from "@/components/cubeLogo";

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
    <html className="bg-black" lang="en">
      <body className={inter.className}>=
        <div className="flex justify-center mx-2">
          <CubeLogo />
        </div>
        {children}
      </body>
    </html>
  );
}
