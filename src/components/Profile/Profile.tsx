'use client';
import { useState } from 'react';
import EditProfileForm from './EditProfileForm';
import { trpc } from '@/lib/trpc/client';
import ProfileCard from '@/components/ProfileCard';

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

export default function Profile({ userId }: { userId: string }) {
  const [isEditing, setIsEditing] = useState(false); // Will be set to False

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = trpc.profile.getProfile.useQuery({ userId });

  const {
    data: contact,
    isLoading: isContactLoading,
    error: contactError,
    refetch: refetchContact,
  } = trpc.contact.getContact.useQuery({ userId });

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
        <>
          <EditProfileForm
            contact={contact as ContactProps}
            profile={profile as ProfileProps}
            userId={userId}
            refetchProfile={refetchProfile}
            refetchContact={refetchContact}
          />
          <button
            className="inline-block border-2 border-red-600"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      )}

      {!isEditing && (
        // ProfileCard just used for testing to see the Profile for now (looks up profile twice right now because of ProfileCard)
        // Will edit it to look different
        <>
          <ProfileCard id={userId} />
          <button
            className="ml-2 mt-3 inline-block border-2 border-black bg-slate-500 p-4"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
