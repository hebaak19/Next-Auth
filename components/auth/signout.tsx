"use client";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";
//we can use router.push from next navigation
export default function SignOut() {
  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
        },
      },
    });
  };
  return <div onClick={handleClick}>Sign Out</div>;
}
