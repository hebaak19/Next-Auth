// app/api/auth/[...auth]/route.ts
import { auth } from "@/lib/auth"; // Your BetterAuth config
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
export const dynamic = "force-dynamic"; // Recommended for auth