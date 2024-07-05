'use client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import EditProfile from '@/components/Profile/EditProfile';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Image from 'next/image';
// import { Instagram, Phone, Mail } from 'lucide-react';
import { Phone } from 'lucide-react';

export interface ContactProps {
  email: string;
  discord: string | '';
  instagram: string | '';
  phone: string | '';
  whatsApp: string | '';
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
  bio: string;
}

// const Icons: Record<string, string> = {
//   whatsapp:
//     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
//   discord: 'something',
//   instagram: '<Instagram />',
//   email: '<Mail />',
//   phone: '<Phone />',
// };

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
    <div>
      {/* Top Section */}
      {!isEditing && (
        <div className="flex flex-col">
          <div className="flex flex-col" style={{ height: 33 }}></div>
          <div className="mt-2 flex" style={{ height: 53 }}></div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          {/* Profile Picture Section */}
          <div className="basis-1/4">
            {profile?.profilePic?.url && (
              <Image
                src={profile.profilePic.url}
                alt="profile"
                width={233}
                height={289}
              />
            )}
          </div>
          {/* First and Last Name and Bio Section */}
          <div className="mr-32 flex basis-1/2 flex-col space-y-5">
            <p className="text-xl font-semibold">
              {profile?.firstName} {profile?.lastName}
            </p>
            {profile?.bio ? (
              <p>{profile.bio}</p>
            ) : (
              <p>
                {profile?.firstName} {profile?.lastName} has no bio.
              </p>
            )}
          </div>
          {/* Contact Section */}
          <div className="flex basis-1/4 flex-col">
            {isSignedIn && contact?.isContactPublic && (
              <div className="flex flex-row">
                <div>
                  <Phone />
                </div>
                <div>{contact?.phone}</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          {currentUser?.id === clerkId ? (
            <div className="ml-auto">
              <Button
                className="w-20 border border-gray-400 bg-profile_button_bg text-black hover:bg-sky-950 hover:text-white"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Edit
              </Button>
            </div>
          ) : (
            <div
              className="ml-auto"
              style={{ minHeight: '36px', maxHeight: '38px' }}
            ></div>
          )}
        </div>
      </div>

      {/* User's Gallery Section */}
      <div>Images</div>
    </div>
  );
}
