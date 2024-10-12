// components/MasonryGrid.tsx
'use client'; // Ensure this component is client-side rendered

import React, { useEffect, useRef } from 'react';
import { Isotope } from './types';

interface GridItem {
  id: number;
  content: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  category?: string;
}

const MasonryGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isotopeInstance = useRef<Isotope | null>(null);

  // Sample data for grid items
  const items: GridItem[] = [
    { id: 1, content: 'Item 1', size: 'small', category: 'cat1' },
    { id: 2, content: 'Item 2', size: 'medium', category: 'cat2' },
    { id: 3, content: 'Item 3', size: 'large', category: 'cat1' },
    // Add more items as needed
  ];

  useEffect(() => {
    if (gridRef.current) {
      // Initialize Isotope when the component mounts
      isotopeInstance.current = new Isotope(gridRef.current, {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
          // Configuration options
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

  return (
    <div ref={gridRef} className="grid">
      {items.map((item) => (
        <div
          key={item.id}
          className={`grid-item ${item.size} ${item.category || ''}`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
