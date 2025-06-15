"use server";
//this is from the server
import { auth } from "./auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { prisma } from "./auth";
interface State {
  errorMessage?: string | null;
}
export async function signUp(prevState: State, formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
    firstName: formData.get("firstname") as string,
    LastName: formData.get("lastname") as string,
  };
  const { email, password, firstName, LastName } = data;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${LastName}`,
        email,
        password,
      },
    });
  } catch (error) {
    //use switch to discover different types
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "User already exists." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
  }
  redirect("/dashboard");
}
export async function Login(prevState: State, formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
  };
  const { email, password } = data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    //use switch to discover different types
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { errorMessage: "User not found." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
  }
  redirect("/dashboard");
}

export async function SearchAccount(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return !!user
}
