import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { ModeToggle } from '../Theme/mode-toggle';
import Image from 'next/image';
import FoMooLogo from '@/public/fo-moo-logo.svg';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { DropDownProfile } from './DropDownProfile';
import { Button } from '../ui/button';

export default function NavBar() {
  const { userId } = auth();
  return (
    <main className="h-30 flex w-full justify-between p-8">
      <Link href="/">
        <Image src={FoMooLogo} alt="FoMoo Logo" width={100} height={100} />
      </Link>
      <div className="flex items-center justify-between gap-4 border border-white p-4">
        <p>Feedback</p>
        <ModeToggle />
        <SignedIn>{userId && <DropDownProfile userId={userId} />}</SignedIn>
        <div className="flex">
          <SignedOut>
            <SignInButton>
              <Button className="px-6 py-3">Get Started</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
