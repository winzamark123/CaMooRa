import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { ModeToggle } from '../Theme/mode-toggle';
import Image from 'next/image';
import FoMooLogo from '@/public/fo-moo-logo.svg';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="h-30 flex w-full justify-between p-8">
      <Link href="/">
        <Image src={FoMooLogo} alt="FoMoo Logo" width={100} height={100} />
      </Link>
      <div className="flex items-center justify-between gap-4 border border-white p-4">
        <SignedIn>
          <h1>Profile</h1>
        </SignedIn>
        <h1>Feedback</h1>
        <div className="flex">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
