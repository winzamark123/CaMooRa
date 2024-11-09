'use client';

import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { createProcessFile } from './processFile';

// Import styles
import '@pqina/pintura/pintura.css';
import './filepond_custom.css';

// Import Pintura components and utilities
import { PinturaEditor } from '@pqina/react-pintura';
import {
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  CropPresetOption,
} from '@pqina/pintura';

// Register FilePond plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImagePreview
);

// Set Pintura plugins
setPlugins(plugin_crop);

const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
};

export default function FilePondComponent({
  photoAlbumId,
  onUploadSuccess,
  allowMultiple = false,
}: {
  photoAlbumId: string;
  onUploadSuccess: (uploadedFiles: any) => void;
  allowMultiple?: boolean;
}): JSX.Element {
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [pond, setPond] = useState<any>(null);
  const [isProcessedFile, setIsProcessedFile] = useState(false);
  const processFile = createProcessFile(photoAlbumId, onUploadSuccess);

  const handleFileAdd = async (error: any, file: any) => {
    if (error || isProcessedFile) return;

    const dimensions = await getImageDimensions(file.file);
    file.dimensions = dimensions;

    setCurrentFile(file);
    setIsEditorVisible(true);
  };

  const handleEditorProcess = async ({ dest }: { dest: Blob }) => {
    setIsEditorVisible(false);
    setIsProcessedFile(true);

    // Create a new File object from the edited Blob
    const editedFile = new File([dest], currentFile.filename, {
      type: dest.type,
    });

    // get dimensions of the edited file
    const dimensions = await getImageDimensions(editedFile);

    // Remove the original file and add the edited one
    pond.removeFile(currentFile.id);
    pond.addFile(editedFile);

    // Store the dimensions with the file
    pond.getFile(editedFile).dimensions = dimensions;

    // Reset the processed flag after a short delay
    setTimeout(() => {
      setIsProcessedFile(false);
    }, 100);
  };

  const customCropRatioOptions: CropPresetOption[] = [
    [1, 'Square'],
    [4 / 3, 'Landscape'],
    [3 / 4, 'Portrait'],
  ];

  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-stone-100 p-4">
      {isEditorVisible && currentFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[80vh] w-[80vw]">
            <PinturaEditor
              src={URL.createObjectURL(currentFile.file)}
              imageReader={createDefaultImageReader()}
              imageWriter={createDefaultImageWriter()}
              locale={{
                ...locale_en_gb,
                ...plugin_crop_locale_en_gb,
              }}
              cropSelectPresetOptions={customCropRatioOptions}
              cropImageSelectionCornerStyle="hook"
              onProcess={handleEditorProcess}
              onClose={() => setIsEditorVisible(false)}
            />
          </div>
        </div>
      )}

      <div className="h-full w-1/2 overflow-auto">
        <FilePond
          ref={(ref) => setPond(ref)}
          filePosterMaxHeight={256}
          acceptedFileTypes={['image/*']}
          instantUpload={false}
          allowMultiple={allowMultiple}
          server={{
            process: processFile,
          }}
          onaddfile={handleFileAdd}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    </div>
  );
}
