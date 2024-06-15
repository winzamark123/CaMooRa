import { trpc } from '@/lib/trpc/client';
import { FormEvent, useState } from 'react';
import { ContactProps, ProfileProps } from './Profile';

interface EditProfileFormProps {
  profile: ProfileProps;
  contact: ContactProps;
  clerkId: string;
  refetchProfile: () => void;
  refetchContact: () => void;
}

interface UpdateProfileProps {
  clerkId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  discord?: string;
  instagram?: string;
  phone?: string;
  whatsApp?: string;
  isContactPublic?: boolean;
  isPhotographer?: boolean;
}

export default function EditProfileForm({
  contact,
  profile,
  clerkId,
  refetchProfile,
}: EditProfileFormProps) {
  const [firstName, setFirstName] = useState<string>(profile.firstName);
  const [lastName, setLastName] = useState<string>(profile.lastName);
  const [isContactPublic, setIsContactPublic] = useState<boolean>(
    contact.isContactPublic
  );
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});

  const updateProfile = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      console.log('Profile name updated successfully');
      refetchProfile();
    },
    onError: (err) => {
      console.error('Error updating Profile', err);
    },
  });

  /**
   * Validates first and last names
   * @param {string} name
   * @param {string} fieldName
   * @returns {string} error
   */
  function validateName(name: string, fieldName: string) {
    // Pattern to ensure the string does not contain any numbers or punctuation
    const noNumberOrPunctuationPattern = /^[a-zA-Z\s]*$/;

    if (!noNumberOrPunctuationPattern.test(name)) {
      return `${fieldName} should not contain numbers or punctuation`;
    }

    if (name.length <= 2) {
      return `${fieldName} must be 2 characters or longer`;
    }
    return '';
  }

  /**
   * Returns validation errors for Profile model fields
   * @param {string} firstName
   * @param {string} lastName
   * @returns {object}
   */
  function validateProfile(firstName: string, lastName: string) {
    const errors: { firstName?: string; lastName?: string } = {};

    // Cut white spaces off inputs
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (trimmedFirstName !== profile.firstName) {
      const firstNameError = validateName(firstName, 'First Name');
      if (trimmedFirstName) errors.firstName = firstNameError;
    }
    if (trimmedLastName !== profile.lastName) {
      const lastNameError = validateName(lastName, 'Last Name');
      if (trimmedLastName) errors.lastName = lastNameError;
    }

    // Validation errors for First and Last Name
    return errors;
  }

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate Profile model fields
    const profileValidationErrors = validateProfile(firstName, lastName);
    if (Object.keys(profileValidationErrors).length > 0) {
      setErrors(profileValidationErrors);
    }

    const updatedProfileData: UpdateProfileProps = { clerkId };
    if (firstName) updatedProfileData.firstName = firstName;
    if (lastName) updatedProfileData.lastName = lastName;

    updateProfile.mutate(updatedProfileData);
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
          onChange={(e) => {
            setLastName(e.target.value);
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
