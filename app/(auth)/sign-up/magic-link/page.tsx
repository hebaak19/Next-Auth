"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error,data } = await signIn.magicLink({
      email:email,
      callbackURL: "/dashboard",
    });
    console.log(data)
    if (error) {
      setMessage("Can't sign in ");
      console.log(error);
    }
  };
  return (
    <div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="p-6 max-w-md mx-auto space-y-4 container"
      >
        <h1 className="text-xl font-semibold">Sign in using magic link</h1>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email "
          name="email"
          type="email"
          className="w-full p-2 border rounded"
        />
        <Button type="submit">Submit</Button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}
