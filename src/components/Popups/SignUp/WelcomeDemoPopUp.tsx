'use client';

import { useEffect, useState } from 'react';
import DemoPopUp from './DemoPopUp';
import { trpc } from '@/lib/trpc/client';

export const WelcomeDemoPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const utils = trpc.useUtils();
  const updateUserMutation = trpc.user.updateUser.useMutation({
    onSuccess: () => {
      utils.user.getIsNewUser.invalidate();
    },
  });

  const { data: userData } = trpc.user.getIsNewUser.useQuery(undefined, {
    staleTime: Infinity,
  });

  useEffect(() => {
    if (userData?.isNewUser) {
      setShowPopup(true);
    }
  }, [userData?.isNewUser]);

  if (!showPopup) return null;

  return (
    <DemoPopUp
      onToggle={() => {
        updateUserMutation.mutate();
        setShowPopup(false);
      }}
    />
  );
};
