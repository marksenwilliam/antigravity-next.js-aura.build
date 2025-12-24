import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "ATMOS LAUNCH KIT | Webbdesign frågeformulär",
  description: "Webbdesign frågeformulär och strategisk analys för ditt varumärke.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
