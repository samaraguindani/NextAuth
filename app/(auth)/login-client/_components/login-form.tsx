'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    signIn(
      'credentials', {
        email, 
        password, 
        redirect: false, 
        //callbackUrl: '/dashboard'
    }).then(res => {
      console.log(res);
      if (res && res.error === 'Configuration') {
        setError('Credenciais Inválidas')
      } else{
        router.push('/dashboard')
      }
    })
  }
  
  return (
    <Card className="mx-auto max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com email e senha</CardDescription>
      </CardHeader>
      <CardContent>
        {' '}
        <form  className="text-left" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="password"
              />
            </div>
          </div>
          {error && (
            <p className='text-red-500 text-sm'>{error}</p>
          )}
          <Button size={'lg'} type="submit" className="w-full mt-10 ">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'mt-2 mx-auto'
          )}
          href="/register"
        >
          Não possui conta?
        </Link>
      </CardFooter>
    </Card>
  );
}
