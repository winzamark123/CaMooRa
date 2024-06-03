import React from 'react';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc/client';
interface ProfileCardProps {
  id: string;
}

export default function ProfileCard({ id }: ProfileCardProps) {
  const {
    data: user_profile,
    isLoading,
    error,
  } = trpc.user.getUserProfile.useQuery({ clerkId: id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user_profile || !user_profile.profile) {
    return <div>No Profile Available for this User</div>;
  }

  return (
    <Card className="flex border-black p-8">
      <div className="flex flex-col border-r-2">
        <p>{id}</p>
        <p>{user_profile.profile.firstName}</p>
        <p>{user_profile.profile.lastName}</p>
        <p>{user_profile.profile.profilePicURL}</p>
      </div>
      <div className="flex gap-4 p-8"></div>
    </Card>
  );
}
