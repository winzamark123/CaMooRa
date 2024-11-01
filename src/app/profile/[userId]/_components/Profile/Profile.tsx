'use client';
import { useState } from 'react';
import EditProfile from '@/app/profile/[userId]/_components/Profile/Edit/EditProfile';
import SignInPopUp from '@/components/Popups/SignInPopUp';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';
import Bio from './Bio/Bio';
import Projects from './Projects';
import type { Contact } from '@/server/routers/Contact/index';
import type { Profile } from '@/server/routers/Profile/index';
import ProfilePic from './ProfilePic/ProfilePic';
import Contacts from './Contacts/Contacts';

interface IProfilePic {
  id: string;
  url: string;
  createdAt: string;
}
export interface ProfileProps extends Profile {
  profilePic: IProfilePic;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();
  const clerkId = pathname.split('/').pop() || '';
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);

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

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const toggleSignInPopUp = () => {
    setShowSignInPopUp(!showSignInPopUp);
  };

  // Conditions for showing the Contact Button
  const usersFullName = `${profile?.firstName} ${profile?.lastName}`;

  // User is Editing their Profile
  if (isEditing) {
    return (
      <div>
        <EditProfile
          contact={contact as Contact}
          profile={profile as ProfileProps}
          clerkId={clerkId}
          refetchProfile={refetchProfile}
          refetchContact={refetchContact}
          setIsEditing={setIsEditing}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="max-w-full px-4 sm:flex  sm:px-10 md:px-12 2xl:px-0">
        <div className="flex w-full gap-10 border">
          {profile?.profilePic?.url && (
            <ProfilePic imageURL={profile?.profilePic.url} />
          )}
          <div
            className="max-w flex-col gap-y-10 
            pt-5 sm:flex sm:h-full sm:max-w-xs sm:justify-between sm:pt-2
            lg:max-w-lg lg:pt-5 xl:max-w-xl 
            "
          >
            <Bio
              bio={profile?.bio}
              equipment={profile?.equipment}
              usersFullName={usersFullName}
              additionalName={profile?.additionalName}
              clerkId={clerkId}
            />
          </div>
          <Contacts
            clerkId={clerkId}
            toggleSignInPopUp={toggleSignInPopUp}
            toggleEditing={toggleEditing}
          />
        </div>
      </div>
      <Projects clerkId={clerkId} />
      {showSignInPopUp && <SignInPopUp onToggle={toggleSignInPopUp} />}
    </div>
  );
}
