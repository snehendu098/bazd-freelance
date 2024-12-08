"use client";

import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import { Inter, Ubuntu } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CDPProvider } from "@/providers/cdp-provider";
import { Toaster } from "@/components/ui/toaster";
import { HuddleClient, HuddleProvider } from "@huddle01/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const huddleClient = new HuddleClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.style} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <CDPProvider>
            <HuddleProvider client={huddleClient}>{children}</HuddleProvider>
          </CDPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
