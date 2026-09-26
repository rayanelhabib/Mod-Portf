import type { Metadata } from "next";
import { Geist, Geist_Mono, Six_Caps } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sixCaps = Six_Caps({
  weight: "400",
  variable: "--font-six-caps",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rayan El Habib | Portfolio",
  description: "Portfolio of Rayan El Habib",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sixCaps.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#16181f]">
        {children}
      </body>
    </html>
  );
}
