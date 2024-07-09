import EditGallery from './EditGallery';

interface ProjectSectionProps {
  clerkId: string;
}
export default function ProjectSection({ clerkId }: ProjectSectionProps) {
  return (
    <div>
      <h4 className="mb-5 border-b-2 pb-4 font-mono font-bold">
        Your Projects{' '}
        <span className="text-xs font-normal">
          (Please Add a Minimum of 3 Photos)
        </span>
      </h4>
      <p className="my-5 text-xs">Click to Add Photos</p>
      <EditGallery clerkId={clerkId} />
    </div>
  );
}
