'use client';

import React from 'react';
import { computeSHA256 } from '@/server/routers/Images/utils';
import { trpc } from '@/lib/trpc/client';

// Import FilePond and plugins
import { FilePond, registerPlugin } from 'react-filepond';

// Import the plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import './filepond_custom.css';

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
  const signedURL = trpc.images.uploadImage.useMutation();

  const processFile = (
    fieldName: string,
    file: Blob,
    metadata: any,
    load: (fileId: any) => void,
    error: (message: string) => void,
    progress: (isComputable: boolean, loaded: number, total: number) => void,
    abort: () => void
  ) => {
    const request = new XMLHttpRequest();
    let aborted = false;

    const actualFile = file as File;

    // Compute the checksum and get image dimensions
    const objectUrl = URL.createObjectURL(actualFile);
    const img = new Image();
    img.src = objectUrl;

    img.onload = async () => {
      try {
        const imgWidth = img.width;
        const imgHeight = img.height;
        URL.revokeObjectURL(objectUrl);

        // Compute the checksum
        const checksum = await computeSHA256(actualFile);

        // Get signed URL
        const signedURLResult = await signedURL.mutateAsync({
          file_type: actualFile.type,
          size: actualFile.size,
          checksum,
          imgHeight,
          imgWidth,
          photoAlbumId,
        });

        if (signedURLResult.error || !signedURLResult.success) {
          error('Failed to get signed URL');
          return;
        }

        const url = signedURLResult.success.signed_url;

        // Upload the file to S3 using XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', actualFile.type);

        xhr.upload.onprogress = (e: ProgressEvent) => {
          progress(e.lengthComputable, e.loaded, e.total);
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            load(actualFile.name); // Notify FilePond that the upload has completed
            if (onUploadSuccess) {
              onUploadSuccess(actualFile.name);
            }
          } else {
            error('Upload failed');
          }
        };

        xhr.onerror = () => {
          error('Upload error');
        };

        xhr.onabort = () => {
          abort();
        };

        xhr.send(actualFile);
      } catch (err) {
        if (!aborted) {
          error('An error occurred');
        }
      }
    };

    img.onerror = () => {
      if (!aborted) {
        error('Failed to load image');
      }
    };

    return {
      abort: () => {
        aborted = true;
        request.abort();
      },
    };
  };

  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-stone-100 p-4">
      <div className="h-full w-1/2 overflow-auto">
        <FilePond
          imagePreviewHeight={150}
          acceptedFileTypes={['image/*']}
          instantUpload={false}
          allowMultiple={allowMultiple}
          server={{
            process: processFile,
          }}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    </div>
  );
};

export default FilePondComponent;
