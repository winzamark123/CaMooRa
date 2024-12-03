import React, { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { PhotoSkeleton } from '@/components/Skeletons/SkeletonCard';
import Image from 'next/image';
import useFetchProfileInfo from './useFetchProfileInfo';

interface ProfileCardProps {
  userId: string;
}

// Separate the data fetching logic into a child component
function ProfileCardContent({ userId }: ProfileCardProps) {
  const { userProfile, userImage, userProfileError, userImageError } =
    useFetchProfileInfo({ userId });

  if (userImageError || userProfileError) {
    return (
      <div>
        Error: {userProfileError?.message}
        {userImageError?.message}
      </div>
    );
  }

  return (
    <Card
      className="relative flex aspect-portrait h-full w-full flex-col 
    justify-end overflow-hidden p-2 sm:rounded-2xl sm:border-slate-400"
    >
      {userImage && (
        <Image
          src={userImage.url}
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
            src={userProfile?.profilePic?.url || '/default-profile.jpg'}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>
        <p>{userProfile?.firstName}</p>
        <p>{userProfile?.lastName}</p>
      </div>
    </Card>
  );
}

// Main component just handles the Suspense wrapper
export default function ProfileCard({ userId }: ProfileCardProps) {
  return (
    <Suspense fallback={<PhotoSkeleton />}>
      <ProfileCardContent userId={userId} />
    </Suspense>
  );
}
