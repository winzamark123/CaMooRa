// components/MasonryGrid.tsx
'use client'; // Ensure this component is client-side rendered

import React, { useEffect, useRef } from 'react';
import Isotope from 'isotope-layout';
import Image from 'next/image';
import { trpc } from '@/lib/trpc/client';

interface GridItem {
  id: number;
  content: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}

interface MasonryGridProps {
  clerkId: string;
  photoAlbumId: string;
}

export default function MasonryGrid({
  clerkId,
  photoAlbumId,
}: MasonryGridProps) {
  const { data, isLoading, error } = trpc.images.getImagesByAlbum.useQuery({
    clerkId,
    photoAlbumId,
  });

  const gridRef = useRef<HTMLDivElement | null>(null);
  const isotopeInstance = useRef<Isotope | null>(null);

  const items: GridItem[] =
    data?.map((image, index) => ({
      id: index,
      content: <Image src={image.url} alt={image.id} fill></Image>,
      size: 'small', // You might want to replace this with image.size if it exists in your data
    })) || [];

  useEffect(() => {
    if (gridRef.current) {
      // Initialize Isotope when the component mounts
      isotopeInstance.current = new Isotope(gridRef.current, {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          // Configuration options
          columnWidth: '.grid-sizer',
        },
      });
    }

    // Cleanup on unmount
    return () => {
      if (isotopeInstance.current) {
        isotopeInstance.current.destroy();
      }
    };
  }, []);

  if (isLoading) return <div className="">Loading...</div>;
  if (error) return <div className="">Error loading gallery</div>;

  return (
    <div ref={gridRef} className="grid">
      {items.map((item) => (
        <div
          key={item.id}
          className={`grid-item relative m-1 inline-block align-top ${
            item.size === 'small'
              ? 'w-1/5 md:w-1/4' // Changes to 25% width on medium screens
              : item.size === 'medium'
                ? 'w-2/5 md:w-1/2'
                : 'w-3/5 md:w-3/4'
          }`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
