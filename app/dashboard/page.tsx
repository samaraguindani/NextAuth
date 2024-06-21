import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import logout from '../(auth)/_actions/logout';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <main className="container p-20 mx-auto text-center">
      <div>
        <h1 className="font-extrabold text-slate-600 dark:text-transparent text-7xl dark:bg-gradient-to-r dark:from-slate-50 dark:via-slate-400 dark:to-slate-200 bg-clip-text">
          Dashboard
        </h1>
        {session.user?.image && (
          <Image src={session.user?.image ?? ''} alt="Imagem do usuario" width={100} height={100} className="rounded-full mx-auto"/>
        )}
        <h3 className="mt-4 font-bold text-muted-foreground">Boas vindas, {session.user?.name}!</h3>
        <hr className="w-1/4 mx-auto mt-5 mb-16" />
        <section className='flex flex-wrap items-center justify-center gap-3'>
          <form action={logout}>
            <Button>Logout</Button>
          </form>
          <Link href="/" className={cn(buttonVariants({variant: 'outline'}))}>Home</Link>
        </section>
      </div>
    </main>
  );
}
