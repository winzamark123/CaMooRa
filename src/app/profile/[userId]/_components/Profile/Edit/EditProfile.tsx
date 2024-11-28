import { SetStateAction } from 'react';
import EditBio from './EditBio/EditBio';
import EditContacts from './EditContacts/EditContacts';
import EditPhotoAlbumSection from './EditPhotoAlbumSection';

interface EditProfileProps {
  userId: string;
  setIsEditing: (value: SetStateAction<boolean>) => void;
}

export default function EditProfile({
  userId,
  setIsEditing,
}: EditProfileProps) {
  return (
    <div className="xl-space-y-16 flex flex-col space-y-5 overflow-hidden p-4 sm:p-0 md:space-y-10">
      <EditBio userId={userId} setIsEditing={setIsEditing} />
      <EditContacts userId={userId} setIsEditing={setIsEditing} />
      <EditPhotoAlbumSection userId={userId} setIsEditing={setIsEditing} />
    </div>
  );
}
