import React from 'react';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import CreatePostForm from '../UploadImage/CreatePostForm';
import EditGallery from './EditGallery/EditGallery';
import { MosaicNodeSchema } from '@/utils/schemas/MosaicNodeSchema';
import { MosaicNode } from 'react-mosaic-component';
import { z } from 'zod';

export default function EditPhotoAlbum({
  albumId,
  clerkId,
}: {
  albumId: string;
  clerkId: string;
}) {
  const {
    data: images,
    isLoading: isLoading,
    isError: isError,
    refetch: refetchImagesByAlbum,
  } = trpc.images.getImagesByAlbum.useQuery({ clerkId, albumId });

  const deleteImage = trpc.images.deleteImage.useMutation();

  const {
    data: layoutData,
    isLoading: layoutLoading,
    error: layoutError,
  } = trpc.photoAlbum.getPhotoAlbumLayout.useQuery({
    clerkId: clerkId,
    photoAlbumId: albumId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error </div>;

  if (layoutLoading) return <div>Loading Layout...</div>;
  if (layoutError) return <div>Error in the Layout</div>;
  if (!layoutData) return <div>No layout data available</div>;

  let initialLayout: MosaicNode<number> | null = null;
  try {
    initialLayout = MosaicNodeSchema.parse(layoutData.layout);
    console.log('THIS IS INIT LAYOUT', initialLayout);
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error('Error parsing layout:', e.errors);
    } else {
      console.error('Unknown error parsing layout:', e);
    }
    initialLayout = null;
  }

  const handleDeleteImage = async (imageId: string) => {
    try {
      const res = await deleteImage.mutate({ imageId: imageId });
      console.log(res);
      await refetchImagesByAlbum();
    } catch (error) {
      console.error('Failed to refetch after delete');
    }
  };

  return (
    <main className="flex flex-col gap-4">
      <div className="h-third-screen">
        <CreatePostForm photoAlbumId={albumId} />
      </div>
      <div className="h-half-screen border border-black">
        <EditGallery
          clerkId={clerkId}
          photoAlbumId={albumId}
          initialLayout={initialLayout}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {images?.map((image) => (
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
