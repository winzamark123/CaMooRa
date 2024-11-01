import { computeSHA256 } from '@/server/routers/Images/utils';
import { trpc } from '@/lib/trpc/client';

export const createProcessFile = (
  photoAlbumId: string,
  onUploadSuccess?: (fileName: string) => void
) => {
  const signedURL = trpc.images.uploadImage.useMutation();

  return async (
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
        URL.revokeObjectURL(objectUrl);

        // Compute the checksum
        const checksum = await computeSHA256(actualFile);

        // Get signed URL
        const signedURLResult = await signedURL.mutateAsync({
          file_type: actualFile.type,
          size: actualFile.size,
          checksum,
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
};
