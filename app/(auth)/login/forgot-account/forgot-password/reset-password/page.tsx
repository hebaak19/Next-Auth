"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || undefined;
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await resetPassword({
      token,
      newPassword: password,
    });
    if (error) {
      setMessage("Failed to reset password");
    } else {
      setMessage("Success you can login ");
      router.push("/login");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-md mx-auto space-y-4 container"
      >
        <h1 className="text-xl font-semibold">Reset your password</h1>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="New Password"
          name="pwd"
          type="password"
          className="w-full p-2 border rounded"
        />
        <Button type="submit">Reset Password</Button>
        {message && <p className="text-black font-light">{message}</p>}
      </form>
    </div>
  );
}
