import Image from 'next/image';
import fomooLogo from '@/public/fo-moo-logo.svg';
import { SignedOut, SignedIn } from '@clerk/nextjs';

export default function Landing() {
  return (
    <main className="flex w-full flex-col items-center ">
      <div className="flex w-full max-w-2xl flex-col font-mono">
        <h1>PHOTOGRAPHER</h1>
        <div className="px-2">
          <h4>CAPTURE</h4>
        </div>
        <div className="flex items-center justify-end gap-12">
          <Image
            src={fomooLogo}
            alt="logo landing page"
            width={100}
            height={100}
          />
          <h1>SERVICE</h1>
        </div>
        <div className="flex justify-end px-2">
          <h4>YOUR MEMORIES</h4>
        </div>
      </div>
      <div className="mt-24 flex w-full items-center justify-center">
        <hr className="flex-grow border border-slate-200" />
        <SignedOut>
          <p className="px-4">Please Sign in to Access Contacts</p>
        </SignedOut>
        <SignedIn>
          <p className="px-4">Welcome to FoMoo!</p>
        </SignedIn>
        <hr className="flex-grow border border-slate-200" />
      </div>
    </main>
  );
}
