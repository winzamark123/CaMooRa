'use client';

import FilePondComponent from './FilePondComponent';

export default function CreatePostForm({
  photoAlbumId,
}: {
  photoAlbumId: string;
}) {
  const handleUploadSuccess = (fileName: string) => {
    console.log(`Upload, ${fileName} success`);
  };

  return (
    <FilePondComponent
      photoAlbumId={photoAlbumId}
      onUploadSuccess={handleUploadSuccess}
      allowMultiple={true}
    />
  );
}
