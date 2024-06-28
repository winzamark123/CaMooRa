import PhotographersList from '../components/Profile/PhotographersList';
import Landing from '@/components/Landing/Landing';
import { SignedOut } from '@clerk/nextjs';

export default async function Home() {
  return (
    <main className="flex w-full max-w-5xl flex-col items-center gap-4 p-10">
      <Landing />
      <SignedOut>
        <div className="flex w-full items-center justify-center">
          <hr className="flex-grow border border-slate-400" />
          <p className="px-2">
            Please Sign in to Access the Photographers Contacts
          </p>
          <hr className="flex-grow border border-slate-400" />
        </div>
      </SignedOut>
      <div className="flex w-full"></div>
      <div className="h-30 flex w-full max-w-5xl flex-col">
        <PhotographersList />
      </div>
    </main>
  );
}
