import Image from 'next/image';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import PopupSVG from '@/public/fo-moo-pop-up.svg';

export default function SignInPopUp({ onToggle }: { onToggle: () => void }) {
  return (
    <main
      className="absolute left-0 top-0 flex h-full w-full 
    items-center justify-center bg-black bg-opacity-50"
      onClick={onToggle}
    >
      <motion.div
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          duration: 0.5,
        }}
        className="left-0 top-1/3 z-30 flex h-80 w-9/12 justify-end 
      rounded-2xl bg-sky-900 px-16 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute left-10 flex flex-col gap-4 p-20">
          <h4>Welcome to FoMoo!</h4>
          <p>Please Sign in with your UCDavis account</p>
          <SignInButton>
            <Button className="dark flex w-fit justify-start gap-3 px-8 py-3">
              <FontAwesomeIcon icon={faGoogle} />
              <p>Sign In with Google</p>
            </Button>
          </SignInButton>
        </div>
        <div className="flex items-end">
          <Image src={PopupSVG} alt="FoMoo Pop Up" />
        </div>
      </motion.div>
    </main>
  );
}
