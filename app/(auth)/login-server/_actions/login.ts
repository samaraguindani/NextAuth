'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function login(formData: FormData) {
    const {email, password} = Object.fromEntries(formData.entries());

    try {
        console.log('aqui');
        
        await signIn('credentials', {email, password})
    } catch (error) {
       if (error instanceof AuthError) {
        if (error.type === 'CredentialsSignin') {
            error.message= 'credenciais Invalidas'
            throw error
        }
       } 
    }

    redirect('/dashboard')
}