import React from 'react';
import FavPhotographer from '../FavPhotographer';
import { useUser } from '@clerk/nextjs';

export interface BioProps {
  bio?: string | null;
  equipment?: string | null;
  usersFullName: string;
  additionalName: string | null | undefined;
  clerkId: string;
}

const Bio: React.FC<BioProps> = ({
  bio,
  equipment,
  usersFullName,
  additionalName,
  clerkId,
}) => {
  const { user: currentUser } = useUser();
  return (
    <main className="flex flex-col gap-4">
      <h1 className="flex flex-col items-center text-lg font-extrabold xs:flex-row lg:text-xl 2xl:text-2xl">
        {usersFullName}
        {additionalName && (
          <span className="text-xs xs:pl-2">({additionalName})</span>
        )}
        {currentUser && (
          <FavPhotographer userId={currentUser.id} photographerId={clerkId} />
        )}
      </h1>
      <p className="text-xs sm:text-sm">
        {bio || `${usersFullName} has no bio.`}
      </p>
      {equipment && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-sm font-semibold lg:text-lg 2xl:text-xl">
            Equipments
          </h2>
          <p className="text-sm">{equipment}</p>
        </div>
      )}
    </main>
  );
};

export default Bio;
