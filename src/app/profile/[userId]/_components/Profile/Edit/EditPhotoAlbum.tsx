import React from 'react';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import { ImageProp } from '@/server/routers/Images/index';
import CreatePostForm from '../UploadImage/CreatePostForm';

export default function EditPhotoAlbum({
  photoAlbumId,
  images,
}: {
  photoAlbumId: string;
  images: Array<ImageProp>;
}) {
  const deleteImage = trpc.images.deleteImage.useMutation();

  const handleDeleteImage = async (imageId: string) => {
    console.log('Image ID: ', imageId);
    const res = await deleteImage.mutate({ imageId: imageId });
    console.log(res);
    console.log('Deleted Image');
    // window.location.reload();
  };

  return (
    <main className="flex flex-col gap-4">
      <div className="h-half-screen">
        <CreatePostForm photoAlbumId={photoAlbumId} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="relative flex h-72 gap-4 p-4">
              <Image
                className="rounded-sm border border-black object-cover"
                src={image.url}
                alt="Photography Image"
                fill
              />
              <button
                className="absolute -right-3 -top-3 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-gray-400 bg-white text-xs  text-black hover:bg-red-400"
                onClick={() => handleDeleteImage(image.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
