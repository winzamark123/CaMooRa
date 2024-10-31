import React, { useState } from 'react';
import tempImage from '@/public/demo/Profile_Edit.png';

// react-pintura
import { PinturaEditorOverlay } from '@pqina/react-pintura';

// pintura
import '@pqina/pintura/pintura.module.css';
import {
  // editor
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  PinturaImageState,
} from '@pqina/pintura';

setPlugins(plugin_crop);

const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
  },
};

interface EditorResult {
  imagePreview: string;
  imageState: PinturaImageState | undefined;
}

export default function PinturaOverlay() {
  // overlay
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState<EditorResult>({
    imagePreview: './image.jpeg',
    imageState: undefined,
  });

  return (
    <div className="App">
      <h2>Overlay</h2>

      <p>
        {!visible && (
          <button onClick={() => setVisible(true)}>Edit image</button>
        )}
        {visible && (
          <button onClick={() => setVisible(false)}>Close editor</button>
        )}
      </p>

      {!visible && (
        <p>
          <img width="512" height="256" src={tempImage.src} alt="" />
        </p>
      )}
      {visible && (
        <div style={{ width: '512px', height: '256px' }}>
          <PinturaEditorOverlay
            {...editorDefaults}
            src={'./image.jpeg'}
            // className={`${pintura} ${pinturaTheme}`}
            imageState={result.imageState}
            onLoad={(res: any) => console.log('load image', res)}
            onProcess={({
              dest,
              imageState,
            }: {
              dest: Blob;
              imageState: PinturaImageState;
            }) => {
              setResult({
                imagePreview: URL.createObjectURL(dest),
                imageState: imageState,
              });
              setVisible(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
