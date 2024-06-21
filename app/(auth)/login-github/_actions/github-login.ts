'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function githubLogin(formData: FormData) {
    await signIn('github')
}