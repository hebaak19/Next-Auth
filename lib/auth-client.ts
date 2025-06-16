/* client side 🔁 and it's how you connect your frontend React components to your BetterAuth server API.*/
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
export const { signOut, signIn, useSession, forgetPassword, resetPassword } =
  createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    plugins: [magicLinkClient()],
    baseURL: "http://localhost:3000",
  });
