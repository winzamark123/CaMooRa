import React from 'react';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc/client';
// import { trpc } from '@/lib/trpc/client';
interface ProfileCardProps {
  id: string;
}

export default function ProfileCard({ id }: ProfileCardProps) {
  const {
    data: user_profile,
    isLoading,
    error,
  } = trpc.profile.getProfile.useQuery({ clerkId: id });

  // Maybe put isContactPublic and isPhotographer fields in Profile Model (we can check if contact not public no need to make extra call for contact) ?
  const contact = trpc.contact.getContact.useQuery({ clerkId: id }).data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user_profile) {
    return <div>No Profile Available for this User</div>;
  }

  return (
    <Card className="flex border-black p-8">
      <div className="flex flex-col border-r-2">
        <p>{id}</p>
        <p>{user_profile.firstName}</p>
        <p>{user_profile.lastName}</p>
        <p>{user_profile.profilePicURL}</p>
        {contact?.isContactPublic && (
          <div>
            <p>{contact.email}</p>
            <p>{contact?.discord}</p>
            <p>{contact?.phone}</p>
            <p>{contact?.whatsApp}</p>
            <p>{contact?.instagram}</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 p-8"></div>
    </Card>
  );
}
