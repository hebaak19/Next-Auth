import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { nextCookies } from "better-auth/next-js";
import { sendMail } from "./email";
import { magicLink } from "better-auth/plugins";
import { sendMagicLinkEmail } from "./email";

export const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  socialProvider: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUN_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 12,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    account: {
      accountLinking: {
        enabled: true, //linking the same user with providers accounts
      },
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({
          to: email,
          subject: "you requested to sign in via magic link",
          text: `click the link to sign in ${url} `,
        });
      },
    }),
    nextCookies(),
  ], //this is important to get the session and cookies
});
