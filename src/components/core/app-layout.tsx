"use client";

import React from "react";
import { WalletDefault } from "@coinbase/onchainkit/wallet";
import Link from "next/link";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#dae7ff] items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md flex items-center justify-center shadow-sm">
        <div className="container flex w-full h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              className="flex items-center gap-2 text-2xl font-bold text-blue-600"
              href="/app"
            >
              BAZD
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors"
                href="/app/create"
              >
                Create Gig
              </Link>
              <Link
                className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors"
                href="/app/find"
              >
                Find Freelancers
              </Link>
              <Link
                className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors"
                href="/app/treasury"
              >
                Treasury
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <WalletDefault />
          </div>
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  );
};

export default AppLayout;
