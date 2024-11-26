'use client';

import { useEffect, useState } from 'react';
import { eventEmitter } from '@/lib/eventEmitter';
import DemoPopUp from './DemoPopUp';

export const WelcomeDemoPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');

    const handleNewUser = () => {
      if (!hasSeenPopup) {
        setShowPopup(true);
        localStorage.setItem('hasSeenWelcomePopup', 'true');
      }
    };

    eventEmitter.on('newUserCreated', handleNewUser);

    return () => {
      eventEmitter.on('newUserCreated', handleNewUser);
    };
  }, []);

  if (!showPopup) return null;

  return <DemoPopUp onToggle={() => setShowPopup(false)} />;
};
