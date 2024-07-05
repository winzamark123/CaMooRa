import React from 'react';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';

export default function Gallery({ clerkId }: { clerkId: string }) {
  const { data: user_images, isLoading: isLoadingImages } =
    trpc.images.getAllImages.useQuery({ clerkId: clerkId });

  if (isLoadingImages) {
    return <div>Loading Images...</div>;
  }

  if (!user_images) {
    return <div>No Images Available for this User</div>;
  }

  return (
    <main className="flex flex-col gap-4">
      <h4 className="font-mono font-bold">Gallery</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {user_images.map((image) => (
          <div key={image} className="relative flex h-72 gap-4 p-4">
            <Image
              className="rounded-sm object-cover"
              src={image}
              alt="profile"
              fill
            />
          </div>
        ))}
      </div>
    </main>
  );
}
