import { trpc } from '@/lib/trpc/client';
import { SetStateAction } from 'react';
import type { ProfileProps } from '../Profile';
import type { Contact } from '../../../../../../server/routers/Contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import EditProfileSection from './EditProfileSection';
import EditLinkAccountSection from './EditLinkAccountSection';
import EditPhotoAlbumSection from './EditPhotoAlbumSection';

interface UpdateProfileVariableType
  extends Omit<ProfileProps, 'firstName' | 'lastName' | 'profilePic'> {
  // Todo: Append profilePic to this type
  firstName?: string;
  lastName?: string;
}

interface UpdateContactVariableType
  extends Omit<Contact, 'isContactPublic' | 'isPhotographer'> {
  userId: string;
  isContactPublic?: boolean;
  isPhotographer?: boolean;
}

interface EditProfileProps {
  profile: ProfileProps;
  contact: Contact;
  userId: string;
  refetchProfile: () => void;
  refetchContact: () => void;
  setIsEditing: (value: SetStateAction<boolean>) => void;
  setIsProfileUpdateSuccessful: (value: boolean) => void;
  manageTimeout: () => void;
}

export default function EditProfile({
  contact,
  profile,
  userId,
  refetchProfile,
  refetchContact,
  setIsEditing,
  setIsProfileUpdateSuccessful,
  manageTimeout,
}: EditProfileProps) {
  // Calling TRPC update procedures
  const updateProfile = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      console.error('Profile fields updated successfully');
      refetchProfile();
      setIsProfileUpdateSuccessful(true);
      manageTimeout();
      setIsEditing(false);
    },
    onError: (err) => {
      console.error('Error updating Profile fields ', err);
      setIsProfileUpdateSuccessful(false);
    },
  });

  const updateContact = trpc.contact.updateContact.useMutation({
    onSuccess: () => {
      console.error('Contact fields updated successfully');
      refetchContact();
      setIsProfileUpdateSuccessful(true);
      manageTimeout();
    },
    onError: (err) => {
      console.error('Error updating Contact fields', err);
      setIsProfileUpdateSuccessful(false);
    },
  });

  // Form validation
  const formSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: 'First Name required' })
      .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
        message: 'First Name should not contain numbers or punctuation',
      })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: 'Last Name required' })
      .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
        message: 'Last Name should not contain numbers or punctuation',
      })
      .optional(),
    email: z.string().optional(),
    discord: z.string().optional(),
    instagramTitle: z
      .string()
      .max(15, 'Instagram Title must be 15 characters or less')
      .optional(),
    instagramLink: z.string().optional(),
    phone: z.string().optional(),
    whatsApp: z.string().optional(),
    portfolioTitle: z
      .string()
      .max(15, 'Portfolio Title must be 15 characters or less')
      .optional(),
    portfolioLink: z.string().optional(),
    isContactPublic: z
      .boolean({ invalid_type_error: 'isContactPublic must be a boolean' })
      .optional(),
    isPhotographer: z
      .boolean({ invalid_type_error: 'isPhotographer must be a boolean' })
      .optional(),
    additionalName: z
      .string()
      .max(10, { message: 'Additional Name must be 10 characters or less' })
      .optional(),
    equipment: z
      .string()
      .max(60, { message: 'Equipment must be 60 characters or less' })
      .optional(),
    bio: z
      .string()
      .max(150, { message: 'Bio must be 150 characters or less' })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: contact.email,
      phone: contact.phone || '',
      whatsApp: contact.whatsApp || '',
      portfolioTitle: contact.portfolioTitle || '',
      portfolioLink: contact.portfolioLink || '',
      instagramTitle: contact.instagramTitle || '',
      instagramLink: contact.instagramLink || '',
      discord: contact.discord || '',
      isContactPublic: contact.isContactPublic,
      isPhotographer: contact.isPhotographer,
      additionalName: profile.additionalName || '',
      equipment: profile.equipment || '',
      bio: profile.bio || '',
    },
  });

  function onSave(values: z.infer<typeof formSchema>) {
    // Cut white spaces off inputs
    const trimmedFirstName = values.firstName?.trim();
    const trimmedLastName = values.lastName?.trim();
    const trimmedDiscordLink = values.discord?.trim();
    const trimmedInstagramTitle = values.instagramTitle?.trim();
    const trimmedInstagramLink = values.instagramLink?.trim();
    const trimmedWhatsAppLink = values.whatsApp?.trim();
    const trimmedPhone = values.phone?.trim();
    const trimmedBio = values.bio?.trim();
    const trimmedPortfolioTitle = values.portfolioTitle?.trim();
    const trimmedPortfolioLink = values.portfolioLink?.trim();
    const trimmedEquipment = values.equipment?.trim();
    const trimmedAdditionalName = values.additionalName?.trim();

    // Checks Profile fields (checks if state variable doesn't equal saved variable in db)
    const updatedProfileData: UpdateProfileVariableType = { userId };
    if (trimmedFirstName !== profile.firstName)
      updatedProfileData.firstName = trimmedFirstName;
    if (trimmedLastName !== profile.lastName)
      updatedProfileData.lastName = trimmedLastName;
    if (trimmedBio !== profile.bio) updatedProfileData.bio = trimmedBio;
    if (trimmedEquipment !== profile.equipment)
      updatedProfileData.equipment = trimmedEquipment;
    if (trimmedAdditionalName !== profile.additionalName)
      updatedProfileData.additionalName = trimmedAdditionalName;

    // Checks Contact fields (checks if state variable doesn't equal saved variable in db)
    const updatedContactData: UpdateContactVariableType = { userId };
    if (values.isContactPublic !== contact.isContactPublic)
      updatedContactData.isContactPublic = values.isContactPublic;
    if (values.isPhotographer !== contact.isPhotographer)
      updatedContactData.isPhotographer = values.isPhotographer;
    if (trimmedDiscordLink !== contact.discord)
      updatedContactData.discord = values.discord;
    if (trimmedPhone !== contact.phone) updatedContactData.phone = values.phone;
    if (trimmedWhatsAppLink !== contact.whatsApp)
      updatedContactData.whatsApp = values.whatsApp;

    if (trimmedInstagramTitle !== contact.instagramTitle)
      updatedContactData.instagramTitle = values.instagramTitle;
    if (trimmedInstagramLink !== contact.instagramLink)
      updatedContactData.instagramLink = values.instagramLink;
    if (trimmedPortfolioTitle !== contact.portfolioTitle)
      updatedContactData.portfolioTitle = values.portfolioTitle;
    if (trimmedPortfolioLink !== contact.portfolioLink)
      updatedContactData.portfolioLink = values.portfolioLink;

    // Update Profile and Contact fields
    if (Object.keys(updatedProfileData).length > 1) {
      updateProfile.mutate({ ...updatedProfileData, userId });
    }
    if (Object.keys(updatedContactData).length > 1) {
      updateContact.mutate({ ...updatedContactData, userId });
    }
  }

  return (
    <div className="xl-space-y-16 flex flex-col space-y-5 overflow-hidden p-4 sm:p-0 md:space-y-10">
      <EditProfileSection
        form={form}
        onSave={onSave}
        profileUrl={profile?.profilePic.url}
        profilePicId={profile?.profilePic.id}
        setIsEditing={setIsEditing}
      />
      <EditLinkAccountSection
        form={form}
        onSave={onSave}
        setIsEditing={setIsEditing}
      />
      <EditPhotoAlbumSection userId={userId} setIsEditing={setIsEditing} />
    </div>
  );
}
