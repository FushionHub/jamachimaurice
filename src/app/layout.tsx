import type { Metadata } from "next";
import { Inter, Calistoga } from 'next/font/google';
import "./globals.css";
import {twMerge} from "tailwind-merge";
import React from "react";

const inter = Inter ({ subsets: ['latin'], variable: '--font-sans' });
const calistoga = Calistoga ({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ["400"],
});

export const metadata: Metadata = {
    title: "Jamachi Mauricennadi",
    description: "I am Jamachi Mauricennadi a web, mobile & software developer.",
    keywords: "Jamachi, Mauricennadi, Jamachi Mauricennadi, FushionHub Ai, FushionHub Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
          className={
            twMerge(
                inter.variable,
                calistoga.variable,
            "bg-gray-950/95 text-white antialiased font-sans")}
      >
        {children}
      </body>
    </html>
  );
}
