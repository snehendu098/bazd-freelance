"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains"; // add baseSepolia for testing

export function CDPProvider(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base} // add baseSepolia for testing
      config={{
        appearance: {
          name: "Bazd", // Displayed in modal header
          logo: "/bazd.png",
          mode: "light", // 'light' | 'dark' | 'auto'
          theme: "default", // 'default' or custom theme
        },
        wallet: {
          display: "modal",
          termsUrl: "https://...",
          privacyUrl: "https://...",
        },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}
