import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900">
      {children}
    </div>
  );
}

export default AuthLayout;
