// File: components/FilePondComponent.tsx

'use client';

import React, { useState } from 'react';
import { computeSHA256 } from '@/server/routers/Images/imagesUtils';
import { trpc } from '@/lib/trpc/client';
import Loader from '@/components/ui/Loader';

// Import FilePond and plugins
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

// Import the plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

interface FilePondComponentProps {
  photoAlbumId: string;
  onUploadSuccess?: (fileName: string) => void;
  allowMultiple?: boolean;
}

const FilePondComponent: React.FC<FilePondComponentProps> = ({
  photoAlbumId,
  onUploadSuccess,
  allowMultiple = false,
}) => {
  const [loading, setLoading] = useState(false);

  const signedURL = trpc.images.uploadImage.useMutation();

  return (
    <>
      {loading && <Loader />}
      <div className="h-full w-full">
        <FilePond
          acceptedFileTypes={['image/*']}
          allowMultiple={allowMultiple}
          server={{
            process: async (
              fieldName,
              file,
              metadata,
              load,
              error,
              progress,
              abort
            ) => {
              setLoading(true);
              try {
                // Compute the checksum
                const checksum = await computeSHA256(file);

                // Get image dimensions
                const img = new Image();
                const objectUrl = URL.createObjectURL(file);
                img.src = objectUrl;

                img.onload = async () => {
                  const imgWidth = img.width;
                  const imgHeight = img.height;
                  URL.revokeObjectURL(objectUrl);

                  // Get signed URL
                  const signedURLResult = await signedURL.mutateAsync({
                    file_type: file.type,
                    size: file.size,
                    checksum,
                    imgHeight,
                    imgWidth,
                    photoAlbumId,
                  });

                  if (signedURLResult.error || !signedURLResult.success) {
                    error('Failed to get signed URL');
                    setLoading(false);
                    return;
                  }

                  const url = signedURLResult.success.signed_url;

                  // Upload the file to S3
                  const xhr = new XMLHttpRequest();
                  xhr.open('PUT', url, true);
                  xhr.setRequestHeader('Content-Type', file.type);

                  xhr.upload.onprogress = (e: ProgressEvent) => {
                    progress(e.lengthComputable, e.loaded, e.total);
                  };

                  xhr.onload = () => {
                    if (xhr.status === 200) {
                      load(file.name); // Pass the file name to the load callback
                      if (onUploadSuccess) {
                        onUploadSuccess(file.name);
                      }
                    } else {
                      error('Upload failed');
                    }
                    setLoading(false);
                  };

                  xhr.onerror = () => {
                    error('Upload error');
                    setLoading(false);
                  };

                  xhr.onabort = () => {
                    abort();
                    setLoading(false);
                  };

                  xhr.send(file);
                };
              } catch (err) {
                error('An error occurred');
                setLoading(false);
              }

              // Provide abort method
              return {
                abort: () => {
                  // Handle abort
                  setLoading(false);
                },
              };
            },
          }}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    </>
  );
};

export default FilePondComponent;
