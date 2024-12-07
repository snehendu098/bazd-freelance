import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import { Inter, Ubuntu } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CDPProvider } from "@/providers/cdp-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <CDPProvider>{children}</CDPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
