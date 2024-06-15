import { trpc } from '@/lib/trpc/client';
import { FormEvent, useState } from 'react';
import { ContactProps, ProfileProps } from './Profile';
import { validateProfile } from '@/utils/validation';

interface EditProfileFormProps {
  profile: ProfileProps;
  contact: ContactProps;
  clerkId: string;
  refetchProfile: () => void;
  refetchContact: () => void;
}

interface UpdateProfileVariableProps {
  clerkId: string;
  firstName?: string;
  lastName?: string;
}

interface UpdateContactVariableProps {
  clerkId: string;
  discord?: string | '';
  instagram?: string | '';
  phone?: string | '';
  whatsApp?: string | '';
  isContactPublic?: boolean;
  isPhotographer?: boolean;
}

export default function EditProfileForm({
  contact,
  profile,
  clerkId,
  refetchProfile,
  refetchContact,
}: EditProfileFormProps) {
  // Declaring State Variables
  const [firstName, setFirstName] = useState<string>(profile.firstName);
  const [lastName, setLastName] = useState<string>(profile.lastName);
  const [discord, setDiscord] = useState<string | ''>(contact.discord);
  const [instagram, setInstagram] = useState<string | ''>(contact.instagram);
  const [phone, setPhone] = useState<string | ''>(contact.phone);
  const [whatsApp, setWhatsApp] = useState<string | ''>(contact.whatsApp);
  const [isPhotographer, setIsPhotographer] = useState<boolean>(
    contact.isPhotographer
  );
  const [isContactPublic, setIsContactPublic] = useState<boolean>(
    contact.isContactPublic
  );
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});

  // Calling TRPC update procedures
  const updateProfile = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      console.log('Profile fields updated successfully');
      refetchProfile();
    },
    onError: (err) => {
      console.error('Error updating Profile fields ', err);
    },
  });

  const updateContact = trpc.contact.updateContact.useMutation({
    onSuccess: () => {
      console.log('Contact fields updated successfully');
      refetchContact();
    },
    onError: (err) => {
      console.error('Error updating Contact fields', err);
    },
  });

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Cut white spaces off inputs (state variables)
    const trimmedFirstName: string = firstName.trim();
    const trimmedLastName: string = lastName.trim();

    // Validate Profile model fields
    const profileValidationErrors = validateProfile(
      trimmedFirstName,
      trimmedLastName
    );

    if (Object.keys(profileValidationErrors).length > 0) {
      setErrors(profileValidationErrors);
      return;
    }

    // Update Profile fields (checks if state variable doesn't equal saved variable in db)
    const updatedProfileData: UpdateProfileVariableProps = { clerkId };
    if (trimmedFirstName !== profile.firstName)
      updatedProfileData.firstName = trimmedFirstName;
    if (trimmedLastName !== profile.lastName)
      updatedProfileData.lastName = trimmedLastName;

    // Update Contact fields (checks if state variable doesn't equal saved variable in db)
    const updatedContactData: UpdateContactVariableProps = { clerkId };
    if (isContactPublic !== contact.isContactPublic)
      updatedContactData.isContactPublic = isContactPublic;
    if (isPhotographer !== contact.isPhotographer)
      updatedContactData.isPhotographer = isPhotographer;
    if (discord !== contact.discord) updatedContactData.discord = discord;
    if (instagram !== contact.instagram)
      updatedContactData.instagram = instagram;
    if (phone !== contact.phone) updatedContactData.phone = phone;
    if (whatsApp !== contact.whatsApp) updatedContactData.whatsApp = whatsApp;

    if (Object.keys(updatedProfileData).length > 1) {
      setErrors({});
      updateProfile.mutate(updatedProfileData);
    }
    if (Object.keys(updatedContactData).length > 1) {
      updateContact.mutate(updatedContactData);
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <label htmlFor="firstName">First Name:</label>
        {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
        <input
          type="text"
          id="firstName"
          placeholder={firstName}
          value={firstName}
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name="First Name"
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="lastName">Last Name:</label>
        {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
        <input
          type="text"
          id="lastName"
          placeholder={lastName}
          value={lastName}
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="discord">Discord:</label>
        <input
          type="text"
          id="discord"
          placeholder={discord}
          value={discord}
          onChange={(e) => {
            setDiscord(e.target.value);
          }}
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="instagram">Instagram:</label>
        <input
          type="text"
          id="instagram"
          placeholder={instagram}
          value={instagram}
          onChange={(e) => {
            setInstagram(e.target.value);
          }}
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          placeholder={phone}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="whatsApp">WhatsApp:</label>
        <input
          type="text"
          id="whatsApp"
          value={whatsApp}
          onChange={(e) => {
            setWhatsApp(e.target.value);
          }}
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder={contact.email}
          readOnly
          className="block cursor-not-allowed border-2"
        />
        <input
          type="checkbox"
          id="isContactPublic"
          checked={isContactPublic}
          onChange={() => setIsContactPublic(!isContactPublic)}
        />
        <label htmlFor="isContactPublic" className="ml-2">
          Contact Public
        </label>
        <input
          type="checkbox"
          id="isPhotographer"
          checked={isPhotographer}
          onChange={() => setIsPhotographer(!isPhotographer)}
          className="ml-3 inline-block"
        />
        <label htmlFor="isPhotographer" className="ml-2">
          Photographer
        </label>
        <button
          type="submit"
          className="mt-2 block border-2 border-green-500 hover:border-green-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
