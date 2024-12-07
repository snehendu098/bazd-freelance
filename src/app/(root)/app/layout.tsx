import AppLayout from "@/components/core/app-layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
