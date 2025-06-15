"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchAccount } from "@/lib/action";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const findUser = await SearchAccount(email);
    if (findUser) {
      router.push("/login/forgot-account/forgot-password/");
    } else {
      router.push("/sign-up");
    }
  };
  return (
    <div>
      {" "}
      <form
        action=""
        onSubmit={handleSubmit}
        className="p-6 max-w-md mx-auto space-y-4 container"
      >
        {" "}
        <h1 className="text-xl font-semibold">Find Your Account</h1>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
          name="email"
          type="email"
          className="w-full p-2 border rounded"
        />
        <Button type="submit">Find Account</Button>
      </form>
    </div>
  );
}
