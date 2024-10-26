'use client';

import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { createProcessFile } from './processFile';

// Import the plugin styles
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import '@pqina/pintura/pintura.css';
import './filepond_custom.css';

import {
  // Image editor
  appendEditor,
  overlayEditor,
  openEditor,
  createDefaultImageReader,
  createDefaultImageWriter,
  legacyDataToImageState,

  // The plugins we want to use
  plugin_crop,
  plugin_filter,
  plugin_finetune,
  plugin_annotate,
  plugin_decorate,
  plugin_resize,

  // method use to set the plugins
  setPlugins,

  // The core ui, markup editor, and plugin locale objects
  locale_en_gb,
  markup_editor_locale_en_gb,
  plugin_crop_locale_en_gb,
  plugin_filter_locale_en_gb,
  plugin_finetune_locale_en_gb,
  plugin_frame_locale_en_gb,
  plugin_redact_locale_en_gb,
  plugin_resize_locale_en_gb,
  plugin_decorate_locale_en_gb,
  plugin_annotate_locale_en_gb,
  plugin_sticker_locale_en_gb,

  // Import the default properties
  markup_editor_defaults,
  plugin_filter_defaults,
  plugin_finetune_defaults,
  plugin_frame_defaults,
} from '@pqina/pintura';

interface FilePondComponentProps {
  photoAlbumId: string;
  onUploadSuccess?: (fileName: string) => void;
  allowMultiple?: boolean;
}

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageEditor,
  FilePondPluginFilePoster
);

setPlugins(
  plugin_crop,
  plugin_filter,
  plugin_finetune,
  plugin_annotate,
  plugin_decorate,
  plugin_resize
);

const FilePondComponent: React.FC<FilePondComponentProps> = ({
  photoAlbumId,
  onUploadSuccess,
  allowMultiple = false,
}) => {
  const processFile = createProcessFile(photoAlbumId, onUploadSuccess);
  const customCropAspectRatioOptions = [
    {
      label: '16:9',
      value: 16 / 9,
    },
    {
      label: '9:16',
      value: 9 / 16,
    },
    {
      label: 'Square',
      value: 1,
    },
  ];

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
            overlayEditor,
            createEditor: openEditor,
            imageReader: [createDefaultImageReader, {}],
            imageWriter: [createDefaultImageWriter, {}],
            editorOptions: {
              // ...getEditorDefaults(),
              cropAspectRatio: undefined,
              cropAspectRatioOptions: customCropAspectRatioOptions,
              locale: {
                cropLabelButtonRecrop: 'Crop',
                cropLabelButtonCrop: 'Crop',
              },
              tools: ['crop'],
            },
          }}
        />
      </div>
    </div>
  );
};

export default FilePondComponent;
