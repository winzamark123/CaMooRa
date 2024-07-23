import Image from 'next/image';
import React from 'react';

interface PhotoImageProps {
  src: string;
  alt: string;
  isHorizontal?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const PhotoImage = React.forwardRef<HTMLImageElement, PhotoImageProps>(
  ({ src, alt, isHorizontal, ...props }) => {
    return (
      <div
        className={`relative h-full w-full border-white ${
          isHorizontal ? 'aspect-w-16 aspect-h-9' : 'aspect-w-9 aspect-h-16'
        }`}
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
          {...props}
        />
      </div>
    );
  }
);

PhotoImage.displayName = 'PhotoImage';

export default PhotoImage;
