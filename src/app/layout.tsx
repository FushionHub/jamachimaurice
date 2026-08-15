import type { Metadata } from "next";
import { Inter, Calistoga } from 'next/font/google';
import "./globals.css";
import {twMerge} from "tailwind-merge";
import React from "react";
import { ThemeProvider } from '@/components/ThemeProvider';
import { AIChat } from '@/components/AIChat';

const inter = Inter ({ subsets: ['latin'], variable: '--font-sans' });
const calistoga = Calistoga ({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ["400"],
});

export const metadata: Metadata = {
    title: "Jamachi Mauricennadi - Professional Developer & AI Specialist",
    description: "Professional web, mobile & software developer specializing in React, Next.js, TypeScript, AI integration, and cloud solutions. Expert in creating stunning digital experiences.",
    keywords: "Jamachi, Mauricennadi, Jamachi Mauricennadi, FushionHub Ai, FushionHub Technology, AI Developer, Web Developer, Next.js, React, TypeScript",
    authors: [{ name: "Jamachi Mauricennadi" }],
    openGraph: {
      title: "Jamachi Mauricennadi - Professional Developer",
      description: "Expert web and AI developer creating stunning digital experiences",
      type: "website",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
          className={
            twMerge(
                inter.variable,
                calistoga.variable,
            "bg-gray-950 text-white antialiased font-sans transition-colors duration-300")}
      >
        <ThemeProvider>
          {children}
          <AIChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
