import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif, Syne } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Meridian — Level Up Gen-Z | Jerah Reeves",
  description:
    "Executive growth dashboard — Level Up Gen-Z twin engine for Jerah Reeves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-white">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
