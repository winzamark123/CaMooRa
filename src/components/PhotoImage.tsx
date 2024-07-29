import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Adjust the import path as needed
import { cva, type VariantProps } from 'class-variance-authority';

const photoImageVariants = cva(
  'relative h-full w-full sm:rounded-xl overflow-hidden filter brightness-50',
  {
    variants: {
      aspect: {
        portrait: 'aspect-portrait w-screen sm:h-96 sm:w-fit', // You might define your own classes for aspect ratios
        landscape: 'aspect-landscape w-96', // or use inline styles for flexibility
      },
    },
    defaultVariants: {
      aspect: 'portrait',
    },
  }
);

export interface PhotoImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof photoImageVariants> {
  src: string;
  alt: string;
  asChild?: boolean;
}

const PhotoImage = React.forwardRef<HTMLDivElement, PhotoImageProps>(
  ({ src, alt, aspect, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        className={cn(photoImageVariants({ aspect, className }))}
        ref={ref}
        {...props}
      >
        <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      </Comp>
    );
  }
);

PhotoImage.displayName = 'PhotoImage';

export { PhotoImage, photoImageVariants };
