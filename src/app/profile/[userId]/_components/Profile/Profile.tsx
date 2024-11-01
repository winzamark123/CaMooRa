'use client';
import { useUser, SignedOut } from '@clerk/nextjs';
import { useState } from 'react';
import EditProfile from '@/app/profile/[userId]/_components/Profile/Edit/EditProfile';
import SignInPopUp from '@/components/Popups/SignInPopUp';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';
import { Button } from '../../../../../components/ui/button';
import Bio from './Bio/Bio';
import Projects from './Projects';
import type { Contact } from '@/server/routers/Contact/index';
import type { Profile } from '@/server/routers/Profile/index';
import IconComponents from './IconComponents';
import ProfilePic from './ProfilePic/ProfilePic';

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
  const { isSignedIn, user: currentUser } = useUser();
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

  const userLinks = [
    contact?.phone && { type: 'phone', data: contact.phone },
    contact?.discord && { type: 'discord', data: contact.discord },
    contact?.whatsApp && { type: 'whatsapp', data: contact.whatsApp },
    contact?.instagramLink && {
      type: 'instagram',
      data: { link: contact.instagramLink, title: contact.instagramTitle },
    },
    contact?.portfolioLink && {
      type: 'portfolio',
      data: { link: contact.portfolioLink, title: contact.portfolioTitle },
    },
    contact?.email && { type: 'email', data: contact.email },
  ].filter(
    (link) =>
      link !== null &&
      typeof link === 'object' &&
      'type' in link &&
      'data' in link
  );

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
      <div className="max-w-full px-4 sm:flex sm:px-10 md:px-12  2xl:px-0">
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
          <div className="flex flex-grow flex-col">
            {isSignedIn && contact?.isContactPublic && (
              <div className="flex pt-5 sm:justify-end sm:pt-0">
                <div className="flex flex-col space-y-4 xl:space-y-6">
                  <h2 className="text-sm font-semibold lg:text-lg 2xl:text-xl">
                    Contact
                  </h2>
                  <ul className="grid list-none grid-cols-2 gap-5 break-all sm:grid-cols-1">
                    {userLinks.map((link, index) => {
                      if (!link) return null;

                      const IconComponent = IconComponents[link.type];

                      if (IconComponent) {
                        return (
                          <li
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <div className="flex items-center space-x-3">
                              {IconComponent}
                              {/* Checks for Links  */}
                              {typeof link.data === 'object' &&
                              (link.type === 'portfolio' ||
                                link.type === 'instagram') ? (
                                <a
                                  className="cursor-pointer text-sm underline hover:text-blue-800"
                                  aria-label={`Link to ${usersFullName} ${link.type}`}
                                  href={link.data.link}
                                >
                                  {link.data.title
                                    ? link.data.title
                                    : link.type[0].toUpperCase() +
                                      link.type.slice(1)}
                                </a>
                              ) : (
                                // No Links
                                <span className="text-sm">
                                  {typeof link.data === 'string'
                                    ? link.data
                                    : link.data.link}
                                </span>
                              )}
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
            )}
            <div className="mt-auto flex items-end justify-end">
              {currentUser?.id === clerkId && (
                <Button
                  className="mt-8 w-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue  focus:text-white sm:w-20"
                  aria-label="Edit your Profile"
                  onClick={toggleEditing}
                >
                  Edit
                </Button>
              )}
              <SignedOut>
                <Button
                  onClick={toggleSignInPopUp}
                  className="mt-8 w-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue  focus:text-white sm:w-20"
                  aria-label={`Contact ${usersFullName}`}
                >
                  Contact
                </Button>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
      <Projects clerkId={clerkId} />
      {showSignInPopUp && <SignInPopUp onToggle={toggleSignInPopUp} />}
    </div>
  );
}
