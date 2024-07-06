import React from 'react';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import CreatePostForm from './CreatePostForm';

export default function Gallery({ clerkId }: { clerkId: string }) {
  const { data: user_images, isLoading: isLoadingImages } =
    trpc.images.getAllImages.useQuery({ clerkId: clerkId });

  const deleteImage = trpc.images.deleteImage.useMutation();

  const handleDeleteImage = async (imageId: string) => {
    console.log('Image ID: ', imageId);
    const res = await deleteImage.mutate({ imageId: imageId });
    console.log(res);
    console.log('Deleted Image');
    window.location.reload();
  };

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
          <div key={image.id} className="relative flex h-72 gap-4 p-4">
            <Image
              className="rounded-sm object-cover"
              src={image.url}
              alt="profile"
              fill
            />
            <button
              className="z-30 font-bold text-white"
              onClick={() => handleDeleteImage(image.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <CreatePostForm />
    </main>
  );
}
