import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Story for Deeksha 💛",
  description: "Our journey through 12 chapters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${dancing.variable} font-body antialiased selection:bg-accent selection:text-white`}
      >
        <div className="grain-texture" />
        <FloatingHearts />
        <main className="relative min-h-screen z-10">
          {children}
        </main>
      </body>
    </html>
  );
}


