'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import { computeSHA256 } from '@/server/routers/Images/imagesUtils';
import Image from 'next/image';

export default function UpdateProfilePicForm({
  profilePicUrl,
}: {
  profilePicUrl: string | undefined;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>('');

  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const signedURL = trpc.images.updateProfilePic.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusMessage('updating');
    setLoading(true);

    // Do all the image upload and everything
    try {
      if (file) {
        setStatusMessage('updating image');
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

        await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });
      }
    } catch (error) {
      setStatusMessage('failed to update profile pic');
      setLoading(false);
      console.error('failed to update profile pic', error);
    } finally {
      setLoading(false);
    }

    setStatusMessage('updated');
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
      <form onSubmit={handleSubmit} className="w-[233px]">
        {statusMessage && (
          <p className="relative mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
            {statusMessage}
          </p>
        )}

        {/* Preivew File */}
        <label>
          {profilePicUrl && !selectedImage && (
            <div className="relative" style={{ width: 233, height: 289 }}>
              <Image
                src={profilePicUrl}
                layout="fill"
                objectFit="cover"
                alt="Attach media"
                className="object-cover"
              />
              <div className="absolute inset-0 cursor-pointer bg-white opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
            </div>
          )}
          {selectedImage && (
            <div className="relative" style={{ width: 233, height: 289 }}>
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
        <button type="submit" className="bg-slate-300 p-4">
          {' '}
          Submit
        </button>
      </form>
    </>
  );
}
