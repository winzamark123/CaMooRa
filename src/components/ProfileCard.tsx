import React from 'react';
import { Card } from '@/components/ui/card';
// import { trpc } from '@/lib/trpc/client';
interface ProfileCardProps {
  id: string;
}

export default function ProfileCard({ id }: ProfileCardProps) {
  return (
    <Card className="flex border-black p-8">
      <div className="flex flex-col border-r-2">
        <p>{id}</p>
        {/* <p>{user_profile.profile.firstName}</p>
        <p>{user_profile.profile.lastName}</p>
        <p>{user_profile.profile.profilePicURL}</p> */}
      </div>
      <div className="flex gap-4 p-8"></div>
    </Card>
  );
}
