'use client';
import React, { useRef, ChangeEvent } from 'react';
import { trpc } from '@/lib/trpc/client';

interface UploadImageButtonProps {
  clerkId: string;
}
export default function UploadImageButton({ clerkId }: UploadImageButtonProps) {
  const inputFile = useRef<HTMLInputElement>(null);

  const uploadImage = trpc.images.updateImages.useMutation({
    onSuccess: () => {
      console.log('Successfully updated Image');
    },
    onError: (error) => {
      console.error('Error updating Image', error.message);
    },
  });

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

      console.log(file);

      uploadImage.mutate({
        clerkId: clerkId,
        image_name: file.name,
        image_url: 'test',
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
