"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//import { useRouter } from "next/navigation";
export default function Page(){
    return(
        <div>
      {" "}
      <form
        action=""
        //onSubmit={handleSubmit}
        className="p-6 max-w-md mx-auto space-y-4 container"
      >
        {" "}
        <h1 className="text-xl font-semibold">Find Your Account</h1>
        <Input
          //onChange={(e) => setEmail(e.target.value)}
          //value={email}
          placeholder="Enter your email"
          name="email"
          type="email"
          className="w-full p-2 border rounded"
        />
        <Button type="submit">Find Account</Button>
      </form>
    </div>
    )
}