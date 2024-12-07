"use client";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnonAadhaarProvider _useTestAadhaar={true} _appName="Bazd">
      {children}
    </AnonAadhaarProvider>
  );
};

export default RootLayout;
