'use client';
import { useState } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { ModeToggle } from '../Theme/mode-toggle';
import Link from 'next/link';
import { DropDownProfile } from './DropDownProfile';
import { Button } from '../ui/button';
import SignInPopUp from '../Popups/SignInPopUp';
import Logo from '@/public/logo.svg';
import Image from 'next/image';

export default function NavBar() {
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSignInPopUp = () => {
    setShowSignInPopUp(!showSignInPopUp);
  };
  const { user } = useUser();

  return (
    <main className="h-30 flex w-full justify-between p-8">
      <div className="p-4">
        <Link href="/">
          <Image src={Logo} alt="Camoora Logo"></Image>
        </Link>
      </div>
      <div className="hidden items-center justify-between gap-4 p-4 sm:flex">
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
      {showSignInPopUp && <SignInPopUp onToggle={toggleSignInPopUp} />}
      <div className="fixed right-8 top-8 z-30 p-4 sm:hidden">
        <button onClick={toggleMenu}>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.829-4.828 4.829a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 011.414 1.414l-4.828 4.829 4.828 4.828z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center 
        justify-center  gap-4 border border-black bg-white p-4 sm:hidden"
        >
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
      )}
    </main>
  );
}
