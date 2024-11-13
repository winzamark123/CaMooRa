'use client';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { createProcessFile } from './processFile';

// Import styles
import './filepond_custom.css';

// Register FilePond plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImagePreview
);

export default function FilePondComponent({
  photoAlbumId,
  onUploadSuccess,
  allowMultiple = false,
}: {
  photoAlbumId: string;
  onUploadSuccess: (uploadedFiles: any) => void;
  allowMultiple?: boolean;
}): JSX.Element {
  const processFile = createProcessFile(photoAlbumId, onUploadSuccess);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-stone-100 p-4">
      <div className="h-full w-full overflow-auto">
        <FilePond
          className="h-fit w-full overflow-hidden"
          filePosterMaxHeight={256}
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
}
