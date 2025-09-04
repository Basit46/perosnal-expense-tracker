import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RootLayoutContent from "./components/RootLayoutContent";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Expense tracker",
  description: "Expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
