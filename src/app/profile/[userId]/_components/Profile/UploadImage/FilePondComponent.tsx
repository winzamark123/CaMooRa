'use client';

import React from 'react';
import { computeSHA256 } from '@/server/routers/Images/utils';
import { trpc } from '@/lib/trpc/client';

// Import the plugin styles
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
// pintura
import '@pqina/pintura/pintura.css';

// Import FilePond and plugins
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import { FilePond, registerPlugin } from 'react-filepond';

// Import the plugins
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import './filepond_custom.css';
import {
  // editor
  openEditor,
  createDefaultImageReader,
  createDefaultImageWriter,
  processImage,
  setPlugins,
  plugin_crop,
  plugin_annotate,
  plugin_finetune,

  // plugins
  // locale_en_gb,
  // plugin_crop_locale_en_gb,
  // plugin_finetune_locale_en_gb,
  // plugin_finetune_defaults,
  // plugin_filter_locale_en_gb,
  // plugin_filter_defaults,
  // plugin_annotate_locale_en_gb,
  // markup_editor_defaults,
  // markup_editor_locale_en_gb,
  // createDefaultShapePreprocessor,
  legacyDataToImageState,
  getEditorDefaults,
} from '@pqina/pintura';

// Register the plugins
registerPlugin(
  // FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageEditor,
  FilePondPluginFilePoster
);

setPlugins(plugin_crop, plugin_finetune, plugin_annotate);

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

  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-stone-100 p-4">
      <div className="h-full w-1/2 overflow-auto">
        <FilePond
          acceptedFileTypes={['image/*']}
          instantUpload={false}
          allowMultiple={allowMultiple}
          server={{
            process: processFile,
          }}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          imageEditor={{
            legacyDataToImageState,
            createEditor: openEditor,

            // Required, used for reading the image data
            imageReader: [
              createDefaultImageReader,
              {
                /* optional image reader options here */
              },
            ],

            // optionally. can leave out when not generating a preview thumbnail and/or output image
            imageWriter: [
              createDefaultImageWriter,
              {
                /* optional image writer options here */
              },
            ],

            // used to generate poster images, runs an editor in the background
            imageProcessor: processImage,

            // editor options
            editorOptions: {
              // // The markup editor default options, tools, shape style controls
              // ...markup_editor_defaults,
              // // The finetune util controls
              // ...plugin_finetune_defaults,
              // // This handles complex shapes like arrows / frames
              // shapePreprocessor: createDefaultShapePreprocessor(),
              // imageCropAspectRatio: { 16: 9 },
              // // The icons and labels to use in the user interface (required)
              // locale: {
              //   ...locale_en_gb,
              //   ...plugin_crop_locale_en_gb,
              //   ...plugin_finetune_locale_en_gb,
              //   ...plugin_annotate_locale_en_gb,
              //   ...markup_editor_locale_en_gb,
              // },
              ...getEditorDefaults(),
            },
          }}
        />
      </div>
    </div>
  );
};

export default FilePondComponent;
