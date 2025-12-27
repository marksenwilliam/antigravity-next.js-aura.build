import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Marksen Media | Webbdesign, SEO & Digital Marknadsföring",
  description: "Vi hjälper företag att dominera sin marknad med strategisk webbdesign, SEO och digital marknadsföring. Bygg ett varumärke som syns, konverterar och växer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/black_hole_remix_remix.mp4" as="video" type="video/mp4" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
