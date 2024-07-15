import React, { useEffect, useRef } from 'react';

// Assuming the rest of your SimpleModal component stays the same
interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  // Function to trap focus within the modal
  const trapTabKey = (e: KeyboardEvent) => {
    const focusableModalElements = modalRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstElement = focusableModalElements?.[0] as HTMLElement;
    const lastElement = focusableModalElements?.[
      focusableModalElements.length - 1
    ] as HTMLElement;

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', trapTabKey);
    return () => {
      document.removeEventListener('keydown', trapTabKey);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      ref={modalRef}
      tabIndex={-1} // Make the modal itself focusable
    >
      <div className="z-50 w-11/12 scale-95 transform-gpu rounded-lg bg-white p-6 shadow-xl transition-transform hover:scale-100 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Change your Profile Picture</h2>
          <button
            onClick={onClose}
            className="p-2 text-lg font-semibold hover:bg-primary_blue hover:text-white focus:bg-primary_blue focus:text-white"
            tabIndex={0} // Ensure the button is focusable
          >
            &times;
          </button>
        </div>
        {/* Division with a light border */}
        <div className="mb-2 border-b border-gray-300"></div>
        <h3 className="mb-10 text-xs">(Click or Tap Image)</h3>
        {children}
      </div>
    </div>
  );
};

export default SimpleModal;
