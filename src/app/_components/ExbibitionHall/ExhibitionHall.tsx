'use client';
import { PhotoSkeleton } from '@/components/Skeletons/SkeletonCard';
import { HoverEffect } from '../../../components/ui/card-hover-effect';
import { ExhibitionDropdown } from './ExhibitionDropdown';
import { useExhibitionData } from './useExhibitionData';

export default function ExhibitionHall() {
  const {
    isLoading,
    all_users,
    fav_users,
    user,
    dropdownText,
    setDropdownText,
    options,
  } = useExhibitionData();

  const otherOption = dropdownText === options[0] ? options[1] : options[0];

  return (
    <main className="flex w-full flex-col p-4 sm:p-0">
      <div className="flex w-full">
        <div className="flex w-full max-w-5xl flex-col justify-between sm:flex-row">
          <h3 className="font-mono">PHOTOGRAPHERS @ UC DAVIS</h3>
          <div className="flex items-end justify-end">
            <ExhibitionDropdown
              dropdownText={dropdownText}
              setDropdownText={setDropdownText}
              otherOption={otherOption}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center gap-4 py-6">
          <PhotoSkeleton />
          <PhotoSkeleton />
          <PhotoSkeleton />
          <PhotoSkeleton />
        </div>
      ) : (
        <div className="w-full">
          {dropdownText === options[1] && user && fav_users && (
            <HoverEffect
              items={[...fav_users]
                .sort(() => Math.random() - 0.5)
                .map((user) => ({ userId: user.id }))}
            />
          )}
          {dropdownText === options[0] && all_users && (
            <HoverEffect
              items={[...all_users]
                .sort(() => Math.random() - 0.5)
                .map((user) => ({ userId: user.id }))}
            />
          )}
        </div>
      )}
    </main>
  );
}
