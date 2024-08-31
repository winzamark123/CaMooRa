import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';

export default function Gallery({ clerkId }: { clerkId: string }) {
  const { data: user_images, isLoading: isLoadingImages } =
    trpc.images.getAllImages.useQuery({ clerkId: clerkId });
  const [columnCount, setColumnCount] = useState(4);

  // Update the number of columns based on the window width
  const updateMod = useCallback(() => {
    const width = window.innerWidth;
    if (width < 480) {
      setColumnCount(2);
    } else if (width < 786) {
      setColumnCount(3);
    } else {
      setColumnCount(4);
    }
  }, []);

  useEffect(() => {
    updateMod(); // Set initial mod value
    window.addEventListener('resize', updateMod);
    return () => window.removeEventListener('resize', updateMod);
  }, [updateMod]);

  const galleryRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const calculateHeight = () => {
        const columns = Array(4).fill(0); // Array to track column heights
        const items = Array.from(node.children); // Get all gallery items

        items.forEach((item, index) => {
          const column = index % columnCount; // Determine the column based on index
          columns[column] += item.getBoundingClientRect().height; // Add the height to the corresponding column
        });

        const maxHeight = Math.max(...columns); // Get the maximum column height
        node.style.height = `${maxHeight}px`; // Set the height of the gallery to fit the tallest column
      };

      calculateHeight(); // Initial height calculation

      // Recalculate on window resize
      const resizeObserver = new ResizeObserver(calculateHeight);
      resizeObserver.observe(node);

      return () => {
        resizeObserver.disconnect();
      };
    },
    [columnCount]
  );
  //console.log('width:', width);

  if (isLoadingImages) {
    return <div>Loading Images...</div>;
  }

  if (!user_images) {
    return <div>No Images Available for this User</div>;
  }

  return (
    <main className="flex flex-col gap-4">
      <h2 className="mb-10 mt-10 font-mono text-xl font-bold">Projects</h2>
      <div
        ref={galleryRef}
        className="flex w-full flex-col flex-wrap gap-3"
        style={{ alignContent: 'flex-start' }}
        aria-label="Gallery"
      >
        {user_images.map((image, index) => {
          if (!image.imageWidth || !image.imageHeight) {
            return;
          }

          const aspectRatio = image.imageWidth / image.imageHeight;
          console.log('aspectRatio:', aspectRatio, ' for image:', image.url);

          // 50% width for landscape images, 25% wdth for portrait images
          let imgWidth = 25;
          if (columnCount === 3) {
            imgWidth = 33.33;
          } else if (columnCount === 2) {
            imgWidth = 50;
          }

          return (
            <div
              key={image.id}
              className="relative rounded-sm border border-black"
              style={{
                aspectRatio,
                width: `calc(${imgWidth}% - 13px)`,
                order: (index % columnCount) + 1,
              }}
            >
              <Image
                className="rounded-sm object-cover"
                src={image.url}
                aria-label="User Image"
                alt="User Image"
                fill
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
