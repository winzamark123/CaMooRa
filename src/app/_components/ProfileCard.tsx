'use client';

import React, { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc/client';
import { PhotoSkeleton } from '@/components/Loading/SkeletonCard';
import Image from 'next/image';

interface ProfileCardProps {
  id: string;
}

// Separate the data fetching logic into a child component
function ProfileCardContent({ id }: ProfileCardProps) {
  const { data: user_profile, error } = trpc.profile.getProfile.useQuery({
    userId: id,
  });

  const { data: user_images } = trpc.images.getAllImages.useQuery({
    userId: id,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user_profile) {
    return <div>No Profile Available for this User</div>;
  }

  return (
    <Card
      className="relative flex aspect-portrait h-full w-full flex-col 
    justify-end overflow-hidden p-2 sm:rounded-2xl sm:border-slate-400"
    >
      {user_images && user_images.length > 0 && (
        // <PhotoImage src={user_images[0].url} alt="profile" />
        <Image
          src={user_images[0].url}
          alt="profile"
          fill
          objectFit="cover"
          className="brightness-50 filter"
        />
      )}
      <div
        className="absolute bottom-2 left-2 right-2 z-10 flex w-auto items-center 
      gap-2 rounded-2xl  bg-primary_blue p-2 text-white"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image
            src={user_profile.profilePic?.url || '/default-profile.jpg'}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>
        <p>{user_profile.firstName}</p>
        <p>{user_profile.lastName}</p>
      </div>
    </Card>
  );
}

// Main component just handles the Suspense wrapper
export default function ProfileCard({ id }: ProfileCardProps) {
  return (
    <Suspense fallback={<PhotoSkeleton />}>
      <ProfileCardContent id={id} />
    </Suspense>
  );
}
