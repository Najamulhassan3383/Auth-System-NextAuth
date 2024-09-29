import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

async function Setting() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <Button>Sign Out</Button>
    </div>
  );
}

export default Setting;
