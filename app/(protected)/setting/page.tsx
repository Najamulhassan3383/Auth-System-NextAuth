import { auth } from "@/auth";

async function Setting() {
  const session = await auth();
  console.log("session", session);
  return <div>{JSON.stringify(session)}</div>;
}

export default Setting;
