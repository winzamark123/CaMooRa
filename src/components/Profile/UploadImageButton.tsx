import React, { useRef, ChangeEvent } from 'react';
import { trpc } from '@/lib/trpc/client';

export default function UploadImageButton() {
  const inputFile = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    // trigger the click event of the hidden file input
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    // handle the file upload event
    if (event.target.files) {
      const file = event.target.files[0];
      const uploadImage = trpc.images.updateImages.useMutation();

      // need to swap in for actual user id with check
      uploadImage.mutate({
        userId: 'user-id',
        image_name: file.name,
      });
    }
  };

  return (
    <main>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        accept="image/*"
      />
      <div className="border-rounded-lg border bg-slate-400 p-4">
        <button onClick={onButtonClick}>Upload Image</button>
      </div>
    </main>
  );
}
