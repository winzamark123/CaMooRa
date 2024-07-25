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
      <h2 className="mb-10 mt-10 font-mono text-xl font-bold">Projects</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {user_images.map((image) => (
          <div
            key={image.id}
            className="relative flex h-72 gap-4 rounded-sm border border-black p-4"
          >
            <Image
              className="rounded-sm object-cover"
              src={image.url}
              alt="profile"
              fill
            />
          </div>
        ))}
      </div>
    </main>
  );
}
