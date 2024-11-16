'use client';

import { trpc } from '@/lib/trpc/client';
import FilePondComponent from './FilePondComponent';

export default function CreatePostForm({
  photoAlbumId,
  userId,
}: {
  photoAlbumId: string;
  userId: string;
}) {
  const handleUploadSuccess = (fileName: string) => {
    console.log(`Upload, ${fileName} success`);
  };
  const utils = trpc.useUtils();

  const handleUploadComplete = async () => {
    // Invalidate the query to trigger a refetch
    await utils.images.getImagesByAlbumId.invalidate({
      photoAlbumId: photoAlbumId,
      userId: userId, // You'll need to pass userId as a prop
    });
  };

  return (
    <FilePondComponent
      photoAlbumId={photoAlbumId}
      onUploadSuccess={handleUploadSuccess}
      allowMultiple={true}
      onUploadComplete={handleUploadComplete}
    />
  );
}
