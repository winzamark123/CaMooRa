import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { ReactNode } from 'react';

interface PopUpProps {
  onToggle: () => void;
  children: ReactNode;
  title: string;
}

export default function PopUp({ onToggle, children, title }: PopUpProps) {
  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable background scrolling when the pop-up is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleEscape = (event: React.KeyboardEvent) => {
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
        aria-label={title}
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
          className="left-0 top-1/3 z-30 h-fit px-16 xs:px-0"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
          <button
            onClick={onToggle}
            className="z-60 absolute right-4 top-4 p-3 text-white"
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
