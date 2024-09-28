import React from "react";

interface HeaderProps {
  headerLabel: string;
}

function Header({ headerLabel }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-2 justify-center items-center">
      <h1 className="text-2xl font-semibold">🔒 Auth</h1>
      <p className="text-muted-foreground text-md">{headerLabel}!</p>
    </div>
  );
}

export default Header;
