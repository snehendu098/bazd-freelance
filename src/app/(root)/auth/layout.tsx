import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen h-screen bg-back flex flex-col relative items-center pt-40">
      <div className="w-1/4 p-14 bg-white h-[60vh] shadow-xl font-md rounded-2xl">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
