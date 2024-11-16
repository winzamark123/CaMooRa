import { Skeleton } from '@/components/ui/skeleton';

export function AlbumSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <AlbumLongPhotoSkeleton />
      <div className="flex h-fit flex-col gap-4">
        <AlbumShortPhotoSkeleton />
        <AlbumShortPhotoSkeleton />
      </div>
      <AlbumLongPhotoSkeleton />
      <AlbumLongPhotoSkeleton />
      <div className="flex h-fit flex-col gap-4">
        <AlbumShortPhotoSkeleton />
        <AlbumShortPhotoSkeleton />
      </div>
      <AlbumLongPhotoSkeleton />
      <AlbumLongPhotoSkeleton />
      <div className="flex h-fit flex-col gap-4">
        <AlbumShortPhotoSkeleton />
        <AlbumShortPhotoSkeleton />
      </div>
    </div>
  );
}

function AlbumLongPhotoSkeleton() {
  return (
    <div className="flex h-fit w-fit flex-col space-y-3 rounded-xl border border-black p-4">
      <Skeleton className="h-[200px] w-[250px] rounded-xl border border-black" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] border border-black" />
        <Skeleton className="h-4 w-[200px] border border-black" />
        <Skeleton className="h-4 w-[250px] border border-black" />
        <Skeleton className="h-4 w-[200px] border border-black" />
      </div>
    </div>
  );
}
function AlbumShortPhotoSkeleton() {
  return (
    <div className="flex h-fit w-fit flex-col space-y-3 rounded-xl border border-black p-4">
      <Skeleton className="h-[70px] w-[250px] rounded-xl border border-black" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] border border-black" />
        <Skeleton className="h-4 w-[200px] border border-black" />
      </div>
    </div>
  );
}
