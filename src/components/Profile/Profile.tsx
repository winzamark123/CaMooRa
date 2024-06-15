'use client';
import { useState } from 'react';
import EditProfileForm from '@/components/Profile/EditProfileForm';
import { trpc } from '@/lib/trpc/client';
import ProfileCard from '@/components/ProfileCard';
import { usePathname } from 'next/navigation';
import UploadingImageButton from '@/components/Profile/UploadImageButton';

export interface ContactProps {
  email: string;
  discord: string | null;
  instagram: string | null;
  phone: string | null;
  whatsApp: string | null;
  isContactPublic: boolean;
  isPhotographer: boolean;
}

export interface ProfileProps {
  firstName: string;
  lastName: string;
  profilePicURL: string | null;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();
  const clerkId = pathname.split('/').pop() || '';

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = trpc.profile.getProfile.useQuery({ clerkId });

  const {
    data: contact,
    isLoading: isContactLoading,
    error: contactError,
    refetch: refetchContact,
  } = trpc.contact.getContact.useQuery({ clerkId });

  if (isProfileLoading || isContactLoading) {
    return <div>Loading...</div>;
  }

  if (profileError || contactError) {
    return <div>Error occurred</div>;
  }

  return (
    <div>
      <h1 className="mb-4 border-b border-black">
        Profile for {profile?.firstName} {profile?.lastName}
      </h1>
      {isEditing && (
        <div>
          <EditProfileForm
            contact={contact as ContactProps}
            profile={profile as ProfileProps}
            clerkId={clerkId}
            refetchProfile={refetchProfile}
            refetchContact={refetchContact}
          />
          <button
            className="inline-block border-2 border-red-600"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <UploadingImageButton />
        </div>
      )}

      {!isEditing && (
        // ProfileCard just used for testing to see the Profile for now (looks up profile twice right now because of ProfileCard)
        // Will edit it to look different
        <div>
          <ProfileCard id={clerkId} />
          <button
            className="ml-2 mt-3 inline-block border-2 border-black bg-slate-500 p-4"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
