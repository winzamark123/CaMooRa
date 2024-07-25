'use client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import EditProfile from '@/components/Profile/EditProfile';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Instagram, Phone, Mail, BriefcaseBusiness } from 'lucide-react';

import Gallery from './Gallery';
// import Link from 'next/link';

export interface ContactProps {
  email: string;
  discord: string | '';
  instagram: string | '';
  phone: string | '';
  whatsApp: string | '';
  portfolio: string | '';
  isContactPublic: boolean;
  isPhotographer: boolean;
}
interface IProfilePic {
  clerkId: string;
  id: string;
  url: string;
  createdAt: string;
}
export interface ProfileProps {
  firstName: string;
  lastName: string;
  profilePic: IProfilePic;
  equipment: string;
  additionalName: string;
  bio: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();
  const clerkId = pathname.split('/').pop() || '';
  const { isSignedIn, user: currentUser } = useUser();

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

  const IconComponents: Record<string, any> = {
    whatsapp: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        height={20}
        width={20}
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    ),
    discord: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        height={20}
        width={20}
      >
        <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
      </svg>
    ),
    instagram: <Instagram size={20} strokeWidth={2} />,
    email: <Mail size={20} strokeWidth={2} />,
    phone: <Phone size={20} strokeWidth={2} />,
    portfolio: <BriefcaseBusiness size={20} strokeWidth={2} />,
  };

  const userLinks = [
    contact?.phone && { type: 'phone', data: contact.phone },
    contact?.discord && { type: 'discord', data: contact.discord },
    contact?.whatsApp && { type: 'whatsapp', data: contact.whatsApp },
    contact?.instagram && { type: 'instagram', data: contact.instagram },
    contact?.portfolio && { type: 'portfolio', data: contact.portfolio },
    contact?.email && { type: 'email', data: contact.email },
  ].filter(
    (link) =>
      link !== null &&
      typeof link === 'object' &&
      'type' in link &&
      'data' in link
  );

  const usersFullName = `${profile?.firstName} ${profile?.lastName}`;
  const showContactButton =
    (!isSignedIn && !contact?.isContactPublic) ||
    (isSignedIn && currentUser?.id !== clerkId) ||
    (!isSignedIn && contact?.isContactPublic);

  // User is Editing their Profile
  if (isEditing) {
    return (
      <div>
        <EditProfile
          contact={contact as ContactProps}
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
      <div className="max-w-full sm:flex">
        <div className="flex">
          <div className="relative h-28 w-28 rounded-full md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-48 xl:w-48">
            {profile?.profilePic?.url && (
              <Image
                src={profile.profilePic.url}
                alt={`Profile Picture of ${usersFullName}`}
                objectFit="cover"
                layout="fill"
                className="rounded-full border border-black"
              />
            )}
          </div>
          <div className="flex max-h-48 flex-grow flex-col pl-3 md:pl-10">
            <h1 className="flex flex-col items-center text-lg font-extrabold xs:flex-row lg:text-xl 2xl:text-2xl">
              {usersFullName}
              {profile?.additionalName && (
                <span className="text-xs xs:pl-2">
                  ({profile.additionalName})
                </span>
              )}
            </h1>
            {/* Bio for bigger screen than sm */}
            <div className="hidden h-full max-w-xs flex-col justify-between pt-2 sm:flex lg:max-w-lg lg:pt-5 xl:max-w-xl">
              <p className="text-xs sm:text-sm">
                {profile?.bio || `${usersFullName} has no bio.`}
              </p>
              {profile?.equipment && (
                <div className="flex flex-col space-y-4">
                  <h2 className="text-sm font-semibold lg:text-lg 2xl:text-xl">
                    Equipments
                  </h2>
                  <p className="text-sm">{profile.equipment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Bio for smaller screen than sm */}
        <div className="max-w flex flex-col gap-y-10 pt-5 sm:hidden">
          <p className="text-sm">
            {profile?.bio || `${usersFullName} has no bio.`}
          </p>
          {profile?.equipment && (
            <div className="flex flex-col gap-y-2">
              <h2 className="text-sm font-semibold lg:text-lg 2xl:text-xl">
                Equipments
              </h2>
              <p className="text-sm">{profile.equipment}</p>
            </div>
          )}
        </div>

        <div className="flex flex-grow flex-col">
          {isSignedIn && contact?.isContactPublic && (
            <div className="flex pt-5 sm:justify-end sm:pt-0">
              <div className="flex flex-col space-y-4 xl:space-y-6">
                <h2 className="text-sm font-semibold lg:text-lg 2xl:text-xl">
                  Contact
                </h2>
                <ul className="grid list-none grid-cols-2 gap-5 sm:grid-cols-1">
                  {userLinks.map((link, index) => {
                    if (!link) return null;

                    const IconComponent = IconComponents[link.type];

                    if (IconComponent) {
                      return (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="flex items-center space-x-3">
                            {IconComponent}
                            <span className="text-sm">{link.data}</span>
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
                {/* <div className="flex flex-row justify-between">
                  {userLinks.map((link, index) => {
                    if (!link) return null;

                    const IconComponent = IconComponents[link.type];
                    return (
                      IconComponent &&
                      link.type !== 'phone' &&
                      link.type !== 'email' && (
                        <a
                          aria-label={`${usersFullName}'s ${link.type} link`}
                          className="flex items-center space-x-3 border-b-2 border-transparent transition-colors duration-300 hover:cursor-pointer hover:border-primary_blue"
                          href={link.data}
                          key={index}
                        >
                          {IconComponent}
                        </a>
                      )
                    );
                  })}
                </div> */}
              </div>
            </div>
          )}
          <div className="mt-auto flex items-end justify-end">
            {currentUser?.id === clerkId && (
              <Button
                className="mt-8 w-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white sm:w-20"
                aria-label="Edit your Profile"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Edit
              </Button>
            )}
            {showContactButton && (
              <Button className="mt-8 w-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white sm:w-20">
                Contact
              </Button>
            )}
          </div>
        </div>
      </div>
      <Gallery clerkId={clerkId} />
    </div>
  );
}
