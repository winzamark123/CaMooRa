'use client';
import { useState, useRef } from 'react';
import EditProfile from '@/app/profile/[userId]/_components/Profile/Edit/EditProfile';
import SignInPopUp from '@/components/Popups/SignIn/SignInPopUp';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';
import Bio from './Bio/Bio';
import Projects from './Projects';
import type { Profile, Contact } from '@prisma/client';
import ProfilePic from './ProfilePic/ProfilePic';
import Contacts from './Contacts/Contacts';
import { ProfileSkeleton } from '@/components/Skeletons/SkeletonCard';

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
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] =
    useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const userId = pathname.split('/').pop() || '';
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = trpc.profile.getPublicProfile.useQuery({ userId });

  const {
    data: contact,
    isLoading: isContactLoading,
    error: contactError,
    refetch: refetchContact,
  } = trpc.contact.getContact.useQuery({ userId });

  if (isProfileLoading || isContactLoading) {
    return <ProfileSkeleton />;
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

  const usersFullName = `${profile?.firstName} ${profile?.lastName}`;

  const manageTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsProfileUpdateSuccessful(false);
    }, 5000);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col">
      {isProfileUpdateSuccessful && (
        <div className="py-4">
          <div className="rounded-md bg-green-500 p-2 text-center text-white shadow">
            Profile Updated Successfully!
          </div>
        </div>
      )}
      {isEditing ? (
        <EditProfile
          contact={contact as Contact}
          profile={profile as Profile}
          userId={userId}
          refetchProfile={refetchProfile}
          refetchContact={refetchContact}
          setIsEditing={setIsEditing}
          setIsProfileUpdateSuccessful={setIsProfileUpdateSuccessful}
          manageTimeout={manageTimeout}
        />
      ) : (
        <>
          <div className="w-full px-4 md:px-8 lg:px-12">
            {/* Main profile section */}
            <div className="flex flex-col gap-6 md:flex-row md:gap-10">
              {/* Profile picture */}
              <div className="flex justify-center md:justify-start">
                {profile?.profilePic?.url && (
                  <ProfilePic imageURL={profile?.profilePic.url} />
                )}
              </div>

              {/* Bio and info section */}
              <div className="flex-grow">
                <div className="w-full md:max-w-xl">
                  <Bio
                    bio={profile?.bio}
                    equipment={profile?.equipment}
                    usersFullName={usersFullName}
                    additionalName={profile?.additionalName}
                    userId={userId}
                  />
                </div>
              </div>

              {/* Contacts section */}
              <div className="w-full md:w-auto">
                <Contacts
                  userId={userId}
                  toggleSignInPopUp={toggleSignInPopUp}
                  toggleEditing={toggleEditing}
                />
              </div>
            </div>
          </div>

          {/* Projects section - Only show in non-editing mode */}
          <div className="w-full">
            <Projects userId={userId} />
          </div>
        </>
      )}

      {showSignInPopUp && <SignInPopUp onToggle={toggleSignInPopUp} />}
    </div>
  );
}
