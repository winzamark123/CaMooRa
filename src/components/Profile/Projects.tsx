import React from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function Projects({ clerkId }: { clerkId: string }) {
  const { data: imageSections, isLoading: isLoadingSections } =
    trpc.images.getAllImageSections.useQuery({
      clerkId,
    });

  const firstSection = imageSections && imageSections[0].id;
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    firstSection
  );

  if (isLoadingSections) {
    return <div>Loading Images...</div>;
  }

  if (!imageSections) {
    return <div>No Images Available for this User</div>;
  }

  return (
    <main className="mt-10 flex flex-col gap-2">
      <h2 className="font-mono text-xl font-bold">Projects</h2>
      <div className="flex flex-row border border-blue-500">
        {imageSections &&
          imageSections.map((section) => (
            <Button
              key={section.id}
              className="rounded-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
              onClick={() => setSelectedSection(section.id)}
            >
              <p>{section.sectionName}</p>
              <p>{selectedSection}</p>
            </Button>
          ))}
      </div>
    </main>
  );
}
