"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "model" | "redirect";
  asChild?: boolean;
}

function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export default LoginButton;
