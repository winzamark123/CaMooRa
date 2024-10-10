import Image from 'next/image';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import PopupSVG from '@/public/fo-moo-pop-up.svg';
import FocusTrap from 'focus-trap-react';

export default function SignInPopUp({ onToggle }: { onToggle: () => void }) {
  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable background scrolling when the pop-up is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onToggle();
    }
  };
  return (
    <FocusTrap>
      <main
        className="fixed left-0 top-0 z-[999] flex h-full 
    w-full items-center justify-center bg-black bg-opacity-50"
        onClick={onToggle}
        aria-modal="true"
        aria-label="Sign In Pop Up"
        onKeyDown={handleEscape}
      >
        <motion.div
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            duration: 0.5,
          }}
          className="left-0 top-1/3 z-30 flex h-80 w-11/12 max-w-4xl justify-end rounded-2xl 
      bg-sky-900 px-16 text-white xs:w-9/12"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute left-8 top-20 flex flex-col gap-4 sm:left-10 sm:top-0 sm:p-20">
            <h4>Welcome to FoMoo!</h4>
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
            <Image src={PopupSVG} alt="FoMoo Pop Up" />
          </div>
          <button
            onClick={onToggle}
            className="absolute right-4 top-4 p-3 text-white"
            aria-label="Close"
          >
            <span className="sm:hidden">X</span>
            <span className="hidden sm:block">Close</span>
          </button>
        </motion.div>
      </main>
    </FocusTrap>
  );
}
