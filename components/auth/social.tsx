import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

function Social() {
  return (
    <div className="w-full grid grid-cols-2 gap-6">
      <Button variant="outline">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
      <Button variant="outline">
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}

export default Social;
