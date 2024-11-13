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

// ... existing customCropAspectRatioOptions and customEditorOptions ...

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

  const handleFileAdd = (error: any, file: any) => {
    if (error || isProcessedFile) return;
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

    // Remove the original file and add the edited one
    pond.removeFile(currentFile.id);
    pond.addFile(editedFile);

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
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-stone-100 p-4">
      {isEditorVisible && currentFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative h-[90vh] w-[90vw] max-w-[1200px]">
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

      <div className="h-full w-full overflow-auto">
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
