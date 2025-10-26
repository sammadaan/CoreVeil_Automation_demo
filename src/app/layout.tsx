
"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/core-ai/header";
import Footer from "@/components/core-ai/footer";
import AnimatedBackground from "@/components/core-ai/animated-background";
import { useState, useEffect } from "react";
import Chatbot from "@/components/core-ai/chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// export const metadata: Metadata = {
//   title: "Coreveil Automation - AI Automation Agency",
//   description: "Automate Everything. Focus on Growth.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Coreveil Automation - AI Automation Agency</title>
        <meta name="description" content="Automate Everything. Focus on Growth." />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="relative bg-background text-foreground overflow-x-hidden">
          {isClient && <AnimatedBackground />}
          <Header />
          <main className="pt-32">{children}</main>
          <Footer />
          {isClient && <Chatbot />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
