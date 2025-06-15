"use client";
import { signIn } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function SocialSignIn({
  provider,
  children,
}: {
  provider: "google";
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={async () => {
        await signIn.social({
          provider,
          callbackURL: "/dashboard",
        });
      }}
      type="button"
      variant="outline"
    >
      {children}
    </Button>
  );
}
