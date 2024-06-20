import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { ModeToggle } from '../Theme/mode-toggle';
import Image from 'next/image';
import FoMooLogo from '@/public/fo-moo-logo.svg';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

export default function NavBar() {
  const { userId } = auth();
  return (
    <main className="h-30 flex w-full justify-between p-8 font-mono">
      <Link href="/">
        <Image src={FoMooLogo} alt="FoMoo Logo" width={100} height={100} />
      </Link>
      <div className="flex items-center justify-between gap-4 border border-white p-4">
        <SignedIn>
          <Link href={`/profile/${userId}`}>
            <p>Profile</p>
          </Link>
        </SignedIn>
        <p>Feedback</p>
        <div className="flex">
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
        <ModeToggle />
      </div>
    </main>
  );
}
