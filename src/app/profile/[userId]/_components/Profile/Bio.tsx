import React from 'react';

interface BioProps {
  bio?: string | null;
  equipment?: string | null;
  usersFullName: string;
}

const Bio: React.FC<BioProps> = ({ bio, equipment, usersFullName }) => {
  return (
    <>
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
    </>
  );
};

export default Bio;
