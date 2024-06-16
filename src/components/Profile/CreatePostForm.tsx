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
        console.log('THIS IS SIGNED URL RESULT:', signedURLResult);

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
      <form
        className="rounded-lg border border-neutral-500 px-6 py-4"
        onSubmit={handleSubmit}
      >
        {statusMessage && (
          <p className="relative mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
            {statusMessage}
          </p>
        )}

        <div className="flex w-full items-start gap-4 pb-4">
          <div className="flex w-full flex-col gap-2">
            {/* Preivew File */}

            <label className="flex">
              <svg
                className="h-5 w-5 transform-gpu text-neutral-500 transition-all hover:cursor-pointer active:scale-75"
                aria-label="Attach media"
                role="img"
                viewBox="0 0 20 20"
              >
                <title>Attach media</title>
                <path
                  d="M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z"
                  className="fill-current"
                ></path>
              </svg>

              <input
                className="hidden flex-1 border-none bg-transparent outline-none"
                name="media"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Preview Image"
            width={300}
            height={300}
          />
        )}
        <button type="submit" className="bg-slate-300 p-4">
          {' '}
          Submit
        </button>
      </form>
    </>
  );
}
