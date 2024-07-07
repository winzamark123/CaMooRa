import React from 'react';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProfileCardProps {
  id: string;
}

export default function ProfileCard({ id }: ProfileCardProps) {
  const {
    data: user_profile,
    isLoading,
    error,
  } = trpc.profile.getProfile.useQuery({ clerkId: id });

  const { data: user_images, isLoading: isLoadingImages } =
    trpc.images.getAllImages.useQuery({ clerkId: id });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % (user_images?.length || 1)
      );
    }, 15000); // Change image every 15 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [user_images]);

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
    <Card className="flex flex-col gap-2 rounded-2xl border-slate-400 p-6">
      {isLoadingImages && <div>Loading Images...</div>}
      <div className="flex h-72">
        {user_images && user_images.length > 0 && (
          <Image
            className="rounded-xl object-cover"
            src={user_images[currentImageIndex].url}
            alt="profile"
            fill
            style={{
              filter: 'brightness(0.65)',
            }}
          />
        )}
      </div>
      <div className="z-10 flex gap-2  text-white">
        <p>{user_profile.firstName}</p>
        <p>{user_profile.lastName}</p>
      </div>
    </Card>
  );
}
