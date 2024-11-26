import { SetStateAction } from 'react';
import EditProfileSection from './EditProfileSection';
import EditLinkAccountSection from './EditLinkAccountSection';
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
      <EditProfileSection userId={userId} setIsEditing={setIsEditing} />
      <EditLinkAccountSection userId={userId} setIsEditing={setIsEditing} />
      <EditPhotoAlbumSection userId={userId} setIsEditing={setIsEditing} />
    </div>
  );
}
