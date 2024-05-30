import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { ModeToggle } from '../Theme/mode-toggle';

export default function NavBar() {
  return (
    <header className="h-30 flex w-full justify-between border border-black bg-slate-500">
      <h1>FoMoo</h1>
      <h1>Feedback</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
      <ModeToggle />
    </header>
  );
}
