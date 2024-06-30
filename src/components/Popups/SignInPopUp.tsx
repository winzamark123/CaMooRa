import { SignInButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function SignInPopUp({ onToggle }: { onToggle: () => void }) {
  return (
    <main
      className="absolute left-0 top-0 flex h-full w-full 
    items-center justify-center bg-black bg-opacity-50"
      onClick={onToggle}
    >
      <div
        className="h-92 left-0 top-1/3 z-30 flex w-9/12 flex-col items-center 
      justify-center gap-4 bg-sky-900 p-12 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <h4>Welcome to FoMoo!</h4>
        <p>Please Sign in with your UCDavis Account</p>
        <SignInButton>
          <Button className="flex gap-3 px-6 py-3">
            <FontAwesomeIcon icon={faGoogle} />
            Sign In with Google
          </Button>
        </SignInButton>
      </div>
    </main>
  );
}
