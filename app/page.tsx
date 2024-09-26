import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center space-y-4">
        <h1 className=" text-4xl mb-4 bg-gradient-to-l from-orange-500 via-green-500 to-blue-500 text-transparent bg-clip-text">
          Welcome to Auth System
        </h1>
      </div>
      <LoginButton>
        <Button variant="secondary" size="lg">
          Sign In
        </Button>
      </LoginButton>
    </div>
  );
}
