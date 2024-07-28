import PhotographersList from './_components/PhotographersList';
import Landing from '@/app/_components/Landing/Landing';
import { SignedOut, SignedIn } from '@clerk/nextjs';

export default async function Home() {
  return (
    <main className="flex w-full max-w-5xl flex-col items-center gap-4 overflow-hidden p-10">
      <Landing />
      <div className="mt-24 flex w-full items-center justify-center">
        <hr className="flex-grow border border-slate-200" />
        <SignedOut>
          <p className="px-4">Please Sign in to Access Contacts</p>
        </SignedOut>
        <SignedIn>
          <p className="px-4">Welcome to FoMoo! Check out our Photographers</p>
        </SignedIn>
        <hr className="flex-grow border border-slate-200" />
      </div>
      <div className="flex w-full"></div>
      <div className="h-30 flex w-full max-w-5xl flex-col">
        <PhotographersList />
      </div>
    </main>
  );
}
