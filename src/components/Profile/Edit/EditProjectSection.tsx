import EditSectionGallery from './EditSectionGallery';
import { trpc } from '@/lib/trpc/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface EditProjectSectionProps {
  clerkId: string;
}

interface SelectedSection {
  sectionId: string;
  sectionIndex: number;
}

export default function EditProjectSection({
  clerkId,
}: EditProjectSectionProps) {
  const { data: imageSections, isLoading: isLoadingSections } =
    trpc.images.getAllImageSections.useQuery({
      clerkId,
    });

  const [selectedSection, setSelectedSection] = useState<SelectedSection>();
  useEffect(() => {
    if (imageSections) {
      setSelectedSection({
        sectionId: imageSections[0].id,
        sectionIndex: 0,
      });
    }
  }, [])

  if (isLoadingSections) {
    return <div>Loading Images...</div>;
  }

  return (
    <div>
      <h4 className="mb-5 border-b-2 pb-4 font-bold">
        Your Projects{' '}
        <span className="text-xs font-normal">
          (Please Add a Minimum of 3 Photos)
        </span>
      </h4>
      <div className="flex flex-row gap-x-4">
        {imageSections &&
          imageSections.map((section, index) => (
            <Button
              key={section.id}
              className="rounded-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
              onClick={() =>
                setSelectedSection({
                  sectionId: section.id,
                  sectionIndex: index,
                })
              }
            >
              <p>{section.sectionName}</p>
            </Button>
          ))}
          {/* TODO: Finish adding more image sections */}
          {/* Allows users to add more Image */}
          <Button className='rounded-full'>+</Button>
      </div>
      <p className="my-5 text-xs">Click to Add Photos</p>

      {selectedSection && <EditSectionGallery section_images={imageSections && imageSections[selectedSection.sectionIndex].Images || []} sectionId={selectedSection.sectionId} />}
    </div>
  );
}
