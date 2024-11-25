import Image from 'next/image';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '../../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import PopupSVG from '@public/fo-moo-pop-up.svg';
import PopUp from '../PopUp';

export default function SignInPopUp({ onToggle }: { onToggle: () => void }) {
  return (
    <PopUp onToggle={onToggle} title="Sign In Pop Up">
      <div
        className="flex h-80 max-w-4xl justify-end rounded-2xl bg-sky-900 px-16
          text-white xs:w-screen"
      >
        <div className="absolute left-8 top-20 flex flex-col gap-4 sm:left-10 sm:top-0 sm:p-20">
          <h4>Welcome to caMOOra!</h4>
          <p>Please Sign in with your UCDavis account</p>
          <SignInButton>
            <Button
              className="dark flex w-fit justify-start gap-3 px-8 py-3"
              aria-label="Sign In with Google"
            >
              <FontAwesomeIcon icon={faGoogle} />
              <p>Sign In with Google</p>
            </Button>
          </SignInButton>
        </div>
        <div className="flex items-end">
          <Image src={PopupSVG} alt="caMOOra Pop Up" />
        </div>
      </div>
    </PopUp>
  );
}
