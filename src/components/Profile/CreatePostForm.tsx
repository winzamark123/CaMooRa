'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import { computeSHA256 } from '@/server/routers/Images/imagesUtils';
import Image from 'next/image';

export default function CreatePostForm() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>('');

  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const signedURL = trpc.images.uploadImage.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusMessage('creating');
    setLoading(true);

    // Do all the image upload and everything
    try {
      if (file) {
        setStatusMessage('uploading image');
        const signedURLResult = await signedURL.mutateAsync({
          file_type: file.type,
          size: file.size,
          checksum: await computeSHA256(file),
        });

        if (signedURLResult.error || !signedURLResult.success) {
          setStatusMessage('error uploading image');
          setLoading(false);
          return;
        }

        const url = signedURLResult.success?.signed_url;
        console.log('THIS IS URL:', url);

        setStatusMessage('uploading image');
        await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });
      }
    } catch (error) {
      setStatusMessage('failed to upload image');
      setLoading(false);
      console.error('Failed to upload image', error);
    } finally {
      setLoading(false);
    }

    setStatusMessage('created');
    console.log(loading);
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="h-full w-full">
        {statusMessage && (
          <p className="relative mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
            {statusMessage}
          </p>
        )}

        {/* Preview File */}
        <label className="block h-full w-full">
          {!selectedImage && (
            <div className="relative flex h-full w-full items-center justify-center bg-gray-200 hover:bg-gray-300">
              <div className="absolute inset-0 flex cursor-pointer items-center justify-center transition-opacity duration-300 hover:opacity-50">
                <span className="text-2xl text-gray-500">+</span>
              </div>
            </div>
          )}
          {selectedImage && (
            <div className="relative h-full w-full">
              <Image
                src={selectedImage}
                layout="fill"
                objectFit="cover"
                alt="Attach media"
                className="object-cover"
              />
              <div className="absolute inset-0 cursor-pointer bg-white opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
            </div>
          )}
          <input
            className="hidden border-none bg-transparent outline-none"
            name="media"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" className="mt-4 bg-slate-300 p-4">
          Submit
        </button>
      </form>
    </>
  );
}
