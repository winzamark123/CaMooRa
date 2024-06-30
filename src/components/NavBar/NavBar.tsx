'use client';
import { useState } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { ModeToggle } from '../Theme/mode-toggle';
import Image from 'next/image';
import FoMooLogo from '@/public/fo-moo-logo.svg';
import Link from 'next/link';
import { DropDownProfile } from './DropDownProfile';
import { Button } from '../ui/button';
import SignInPopUp from '../Popups/SignInPopUp';

export default function NavBar() {
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);

  const toggleSignInPopUp = () => {
    setShowSignInPopUp(!showSignInPopUp);
  };
  const { user } = useUser();

  return (
    <main className="h-30 flex w-full justify-between p-8">
      <Link href="/">
        <Image src={FoMooLogo} alt="FoMoo Logo" width={100} height={100} />
      </Link>
      <div className="flex items-center justify-between gap-4 border border-white p-4">
        <p>Feedback</p>
        <ModeToggle />
        <SignedIn>{user && <DropDownProfile userId={user.id} />}</SignedIn>
        <div className="flex">
          <SignedOut>
            <Button className="px-6 py-3" onClick={toggleSignInPopUp}>
              Get Started
            </Button>
          </SignedOut>
        </div>
      </div>
      {showSignInPopUp && <SignInPopUp />}
    </main>
  );
}
